<?php

namespace isearch;

class ItemScraper extends \scraper\PageScraper {



	protected $filterFn=null;

	public function __construct($path) {

		if (!file_exists($path)) {
			mkdir($path);
		}

		$scraper = $this;

		$this->setOutputPath($path)
			->setPagePreformatter(function ($page) use($scraper){

				print_r('content: '.$page);
				$items = explode('<input type="radio"', $page);
				array_shift($items);

				$super='';

				$items = array_map(function ($snippet) use(&$super){

					$fields = explode('value="hint:(', $snippet);
					$snippet=array_pop($fields);
					
					$fields = explode(')', $snippet);
					$value=array_shift($fields);


					$fields = explode('|', $value);
					$super=$fields[0];
					$category=$fields[1];
					
					print_r(array($super, $category));
					//die();
					

					
					return $category;

				}, $items);

				return json_encode(array(
					'parent'=>$super, 'items' => $items, 'url' => $scraper->getCurrentUrl()), JSON_PRETTY_PRINT);


			})
			->setItemParser(function ($page) {
				return json_decode($page);
			})
			->setPageCacheNamer(function ($url) {

				$parts=explode('/', $url);
				return array_pop($parts).'.json';
				
			});
		parent::__construct();

	}

	public function readPagesFromCachedIndexAt($listDir) {

		$items=json_decode(file_get_contents($listDir.'/index.json'));
		$items=$items->items;
		if(empty($items)){
			throw new \Exception('empty');
		}

		$this->setNextPageParser(function ($page) use(&$items){

			if(empty($items)){
				return null;
			}
			$item=array_shift($items);
			
			$path = 'http://redbookonline.bc211.ca/widgets/create/slug/homepage_map_search/request_type/RenderPartial/search_word/' . $item->id;
			return $path;

		});

		return $this;
	}


}