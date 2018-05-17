const input = document.getElementById('inp');
const listarea = document.getElementById('lists');
const countspan = document.getElementById('left_count');
const pills = document.querySelectorAll('#pills a');
const clearc = document.getElementById('clearc');
let todos = [{text:'Add',state:false},{text:'some',state:true},{text:'tasks here!',state:false}];
try {
	let lstodos = JSON.parse(localStorage["mytodos"]);
	todos = lstodos;
	refresharea();
	renderlists(getactivetab());
	rendercount();
}
 catch(e) {
 	console.log(e);
	renderlists(getactivetab());
	rendercount();
}

input.addEventListener("keyup",function (event) {
	if(event.keyCode==13){
		addtoarray(input.value);
		clearinput();
		refresharea();
		renderlists(getactivetab());
	}
})


function addtoarray(todo) {
	let ind = todos.findIndex(x=>x.text==todo);
	if(todo.length==0){
		alert("Your todo cannot be blank!");
	}
	else if(ind!=-1){
		alert("This todo is already in the list!");
	}
	else{
		const textnstate = {
		text:todo,
		state:false
	}
	todos.push(textnstate);
	rendercount();
	}
	localStorage["mytodos"] = JSON.stringify(todos);
}

function removefromarray(todotxt){
	const index = todos.findIndex(x => x.text==todotxt);
	if (index !== -1) todos.splice(index, 1);
	rendercount();
	localStorage["mytodos"] = JSON.stringify(todos);

}

function clearinput() {
	input.value='';
}

function getactivetab() {
	let i=-1;
	let activetab = document.getElementsByClassName('active')[0].children[0].textContent;
		switch(activetab){
			case 'All':
				i=0;
				break;
			case 'Active':
				i=1;
				break;
			case 'Completed':
				i=2;
				break;
		}
		return i;

}

function rendercount(){
	countspan.textContent=todos.filter(i=>i.state==false).length;
	localStorage["mytodos"] = JSON.stringify(todos);

}

	
clearc.addEventListener('click',function(){
		todos = todos.filter(i=>i.state==false);
		refresharea();
		renderlists(getactivetab());
		localStorage["mytodos"] = JSON.stringify(todos);

	});
function renderlists(filtertype){

	let todoarray=null;
	switch(filtertype){
		case 0: 
			todoarray=todos;
			break;
		case 1:
			todoarray = todos.filter(i=>i.state==false);
			break;
		case 2:
			todoarray = todos.filter(i=>i.state==true);
			break;
	}	
	todoarray.map(x=>{
		// currenttodos.push(x);
		todotext = document.createTextNode('hello');
		let tr = document.createElement('tr');
		let td = document.createElement('td');
		td.className='listtd';

		let lbl = document.createElement('label');
		lbl.setAttribute('class','label');
			let textspan = document.createElement('span');
			textspan.setAttribute('class','tspan');
			let cb = document.createElement('input');
			cb.setAttribute('type','checkbox');
			cb.setAttribute('class','check');

			let span = document.createElement('span');
			span.setAttribute('class','checkmark');
			
		cb.onchange = function(){
			const txt = this.parentElement.parentElement.textContent;
			const index = todos.findIndex(x => x.text==txt);
			const cbrow = this.parentElement.parentElement;
			if(this.checked==true){
				cbrow.setAttribute('style','text-decoration: line-through;');
				todos[index].state=true;
			}
			else{
				cbrow.removeAttribute('style');
				todos[index].state=false;
			}
			rendercount();
			localStorage["mytodos"] = JSON.stringify(todos);
		}


		let delbtn = document.createElement('i'); 
		delbtn.setAttribute('class','delbtn fa fa-times');
		delbtn.onclick = function() {
			const txt = this.parentElement.textContent;
			removefromarray(txt);
		    const listrow = this.parentElement.parentElement;
		    listrow.parentNode.removeChild(listrow);
			localStorage["mytodos"] = JSON.stringify(todos);
		  }

		if(x.state==true){
			td.setAttribute('style','text-decoration: line-through;');
			cb.checked=true;
		}
		textspan.textContent = x.text;
		lbl.appendChild(textspan);
		lbl.appendChild(cb);
		lbl.appendChild(span);
		td.appendChild(lbl);
		td.appendChild(delbtn);
		tr.appendChild(td);
		listarea.appendChild(tr);
		localStorage["mytodos"] = JSON.stringify(todos);
		
	})
}



function refresharea(){
	while (listarea.hasChildNodes()) {
	  listarea.removeChild(listarea.lastChild);
	}
}

const all = document.getElementById('all');
const active = document.getElementById('active');
const completed = document.getElementById('completed');

for(let i=0;i<3;i++){
	pills[i].addEventListener('click',function(e){
	switch(pills[i].text){
		case 'All':
			refresharea();
			renderlists(0);
			break;
		case 'Active':
			refresharea();
			renderlists(1);
			break;
		case 'Completed':
			refresharea();
			renderlists(2);
			break;
	}
})
localStorage["mytodos"] = JSON.stringify(todos);

}


