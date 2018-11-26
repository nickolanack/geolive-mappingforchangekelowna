<?php

namespace isearch;


class IndexScraper extends \scraper\PageScraper{


	public function __construct($path){

	
		if(!file_exists($path)){
			mkdir($path);
		}

		$scraper=$this;


		$this->setPagePreformatter(function ($page) use ($scraper) {

			//exit("content:".$page);

	
			$items = explode('<span class="quick_link_icon bg_white">', $page);
			array_shift($items);

			$items = array_map(function ($snippet) {

				$fields = explode('data-id="', $snippet);
				$snippet=array_pop($fields);
				
				$fields = explode('"', $snippet, 2);
				$id=intval(array_shift($fields));
				$snippet=array_pop($fields);

				$fields = explode('>', $snippet, 2);
				//print_r($snippet);
				//print_r($fields);
				//die();
				$snippet=array_pop($fields);


				$fields = explode('<', $snippet, 2);
				$name=array_shift($fields);


				
				return array(
					"id"=>$id,
					"name"=>$name
				);

			}, $items);

			return json_encode(array('items' => $items, 'url' => $scraper->getCurrentUrl()), JSON_PRETTY_PRINT);

		})
		->setOutputPath($path)->setPageCacheNamer(function ($url) use ($scraper, &$currentPage) {
			$name = 'index.json';
			echo $name . "\n";
			return $name;
		})
		->setItemParser(function ($page) {

			return json_decode($page);

		});
		

		parent::__construct('http://redbookonline.bc211.ca/search_form');

	}



}