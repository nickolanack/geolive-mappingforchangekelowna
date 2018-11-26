<?php

namespace isearch\kcr;


class IndexScraper extends \scraper\PageScraper{


	public function __construct($path){

	
		if(!file_exists($path)){
			mkdir($path);
		}

		$scraper=$this;

		$pages=range('A', 'Z');
			array_unshift($pages, '0-9');


		$this->setPagePreformatter(function ($page) use ($scraper) {

			//exit("content:".$page);

			
			//
			$items = explode('<tr valign="top">', $page);
			array_shift($items);

			$items = array_map(function ($snippet) {

				//print_r($snippet."");


				$parts=explode('<a class="DetailsLink"', $snippet);
				$parts=explode('>', $parts[1]);
				$parts=$parts[1];
				$parts=explode('</', $parts);
				$name=$parts[0];

				$parts=explode('href="/record/', $snippet);
				$parts=explode('"',$parts[1]);
				$link=$parts[0];


				$parts=explode('<td >', $snippet);
				$address=$parts[1];
				$address=explode('</td', $address);
				$address=strip_tags($address[0]);
				

				$phone=$parts[2];
				$phone=explode('</td', $phone);
				$phone=strip_tags($phone[0]);


				return array(
					'name'=>$name,
					'address'=>$address,
					'phone'=>$phone,
					'link'=>'https://kelowna.cioc.ca/record/'.$link

				);


			}, $items);

			return json_encode(array('items' => $items, 'url' => $scraper->getCurrentUrl()), JSON_PRETTY_PRINT);

		})
		->setOutputPath($path)->setPageCacheNamer(function ($url) use ($scraper, &$currentPage) {
			$name = explode("=", $url);
			$name=array_pop($name).'.json';
			echo $name . "\n";
			return $name;
		})
		->setItemParser(function ($page) {

			return json_decode($page);

		});
		
		$this->setNextPageParser(function ($page) use(&$pages){

			if(empty($pages)){
				return null;
			}
			$page=array_shift($pages);
			
			$path = 'https://kelowna.cioc.ca/browsebyorg.asp?Let='.$page;
			return $path;

		});

		parent::__construct();

	}



}