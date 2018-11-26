<?php

namespace isearch\kcr;

class ItemScraper extends \scraper\PageScraper {



	protected $filterFn=null;

	public function __construct($path) {

		if (!file_exists($path)) {
			mkdir($path);
		}

		$scraper = $this;

		$this->setOutputPath($path)
			->setPagePreformatter(function ($page) use($scraper){

				//print_r('content: '.$page);

				

				$items = explode('<td class="FieldLabelLeft">', $page);
				array_shift($items);

				$data=array();

				$decodeEntities=array();
				$stripHtml=array();

				foreach ($items as $item) {
					$parts=explode('</td>', $item);
					$label=$parts[0];

					$parts=explode('<td class="field-detail clearfix">', $item);
					$parts=explode('</td>', $parts[1]);
					$name=$parts[0];


					$data[$label]=$name;
					$decodeEntities[]=$label;
					$stripHtml[]=$label;

				}

				if(key_exists("Address & Map", $data)&&strpos($data["Address & Map"],"latitude=")!==false){
					$adr=$data["Address & Map"];
					
					$lat=explode('latitude="', $adr);
					$lat=explode('"',$lat[1]);
					$lat=$lat[0];

					$lng=explode('longitude="', $adr);
					$lng=explode('"',$lng[1]);
					$lng=$lng[0];

					$data["Coordinates"]=array($lat, $lng);
				}


				foreach($stripHtml as $htmlField){
					if(key_exists($htmlField, $data)){
						$data[$htmlField]=str_replace('<br/>', "\n", $data[$htmlField]);
						$data[$htmlField]=str_replace('&nbsp;',"",$data[$htmlField]);
						$data[$htmlField]=strip_tags($data[$htmlField]);
					}
				}

				foreach($decodeEntities as $encodedField){
					if(key_exists($encodedField, $data)){
						$data[$encodedField]=html_entity_decode($data[$encodedField]);
					}
				}

				
				return json_encode($data, JSON_PRETTY_PRINT);


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

		$items=array();
		foreach(array_filter(scandir($listDir), function($p){return strpos($p, '.json')!==false;}) as $list){
			$listItems=json_decode(file_get_contents($listDir.'/'.$list));
			if(is_null($listItems)){
				throw new \Exception($listDir.'/'.$list);
			}
			$listItems=$listItems->items;
			$items=array_merge($items, $listItems);
		}
		

		
		if(empty($items)){
			throw new \Exception('empty');
		}

		$this->setNextPageParser(function ($page) use(&$items){

			if(empty($items)){
				return null;
			}
			$item=array_shift($items);
			
			$path = $item->link;
			return $path;

		});

		return $this;
	}


}