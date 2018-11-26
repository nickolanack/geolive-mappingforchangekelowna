<?php



class ServiceCsvReader{

	protected $file;
	protected $rows=array();

	public function fromFile($file){
		$this->file=$file;

		$bac_ = ini_get('auto_detect_line_endings');
        ini_set('auto_detect_line_endings', true);
       
        $handle = fopen($file, 'r');

        if (!$handle ) {
            throw new Exception('Invalid File, or Failed to read');
        }
        $csv=$this->readRows($handle);
        fclose($handle);
        ini_set('auto_detect_line_endings', $bac_);

        return $this;

		
	}
	protected function readHeader($handle){
		return fgetcsv($handle, 0, ',');
	}
	protected function readRows($handle){

		$header=$this->readHeader($handle);

	
		while (($data = fgetcsv($handle, 0, ',')) !== false) {
	         {
	           

	         	$this->rows[]=array_combine($header, $data);

	    
	        }
	    }

	    //print_r($this->rows);
	    //die();
	    
	}


	public function getCategoryTree(){

		$field='Categories';
		$categories=array();
		foreach($this->rows as $row){
			$categoryStr=$row[$field];
			$catParts=explode(';', $categoryStr);
			array_pop($catParts);
			foreach($catParts as $catGroup){
				$cats=explode('*',$catGroup);

				$mainCategory=trim(array_shift($cats));
				if(!key_exists($mainCategory, $categories)){
					$categories[$mainCategory]=array();
				}

				foreach($cats as $subCategory){
					$subCategory=trim($subCategory);
					if(!in_array($subCategory, $categories[$mainCategory])){
						$categories[$mainCategory][]=$subCategory;
					}
				}

			}
		}

		return $categories;

	}


}





$categories=(new ServiceCsvReader())
	->fromFile(__DIR__.'/services.csv')
	->getCategoryTree();



file_put_contents(__DIR__.'/service_categories.json', json_encode(array_keys($categories), JSON_PRETTY_PRINT));
file_put_contents(__DIR__.'/service_category_tree.json', json_encode($categories, JSON_PRETTY_PRINT));


