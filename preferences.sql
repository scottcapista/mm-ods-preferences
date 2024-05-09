SELECT * 
from `domain`.party 
where 1=1
	and identifier = 'conventions2080@yandex.com'
	and identifierType = 'email';

SELECT 	*
from FLATTEN(UNWIND( `domain`.party with path => preferences, INDEX => idx))
where 1=1
	and identifier = 'conventions2080@yandex.com'
	and identifierType = 'email'
	

	
select * 
from `domain`.flat_party 
WHERE 1=1
	and identifier = 'conventions2080@yandex.com'
	and identifierType = 'email'; 
