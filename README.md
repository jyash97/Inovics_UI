# Don't Share or Reveal the content of this Repository to Anyone. _**Copyrights : Yash**_ 

## Git Commands

### _Date : 9 December 2017_ 

* git status
* git checkout  -- filename ( Removes local changes )
* git add -A or git add --all (Inserts all)
* git add . ( Do not push deleted steps )
* git checkout branchname ( Switch to a next branch )
* git pull origin Branchname ( to synch local files to the repository ) 
* git checkout -b branchname ( to create and switch repository to  new branch )
* git push origin Branchname ( push to the speciific branch )
* git commit -m "Message" ( commits the tree with the pariticular msg )
* git log ( prints the activities on repository )
* git clone Repository-link
* For editing Readme refer to this [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

___

## ES6

### _Date :_

#### About ES6

* Ecma International creates standard for Technologies. ( QWERTY )
* ECM - 262 standardization for scripting language.
* JS : A general purpose scripting language that conforms to the ECMAScript specification.
* ES6 : It is the sixth edition of the ECMA-262 standard, and features major changes and improvements to the ECMAScript specification.
* Babel : Babel is a transpiler for JavaScript best known for its ability to turn ES6 into code ( ES5 ) that runs in your browser today.

___

#### ES6 Coding

##### **Variables :**

* **Understanding _Const_ , _Let_ and _var_ :**

	* Const and Let are block scoped. ``` [ if(cond){ var a = 10 } access(a) ```  _Will Work but let & const will not_
	* var is functional scope. ``` [ function name(){ var a = 10 } access(a) ] ```  _Will give an error_ 
	* Let and const are decalared only once.
	* _Const_ cannot be reassigned the values whereas _Let_ can be reassigned.
	* To prevent access of variables _IIFE_ can be used.
	* Eg: ``` log( a ); var a = 10; ```  Can access 'a' but not the value of 'a' 
	
___	
	
* **Best Pratices**

	* Use const by default
	* Only use Let if rebinding is needed.
	* Use var for top level variables that are shared across large scopes.
	
___	
		
##### **Arrow Functions :**

