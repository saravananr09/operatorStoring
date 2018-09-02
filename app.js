const userList = document.querySelector('#user-list');
const form = document.querySelector('#add-cafe-form');


function renderUser(doc) {
 let li = document.createElement('li');
 let name = document.createElement('span');
 let number = document.createElement('span');
 let city = document.createElement('span');
 let operator = document.createElement('span');
 let cross = document.createElement('div');

 li.setAttribute('data-id', doc.id);
 name.textContent = doc.data().name;
 number.textContent = doc.data().number;
 city.textContent = doc.data().city;
 operator.textContent = doc.data().operator;
 cross.textContent = 'x';

 li.appendChild(name);
 li.appendChild(number);
 li.appendChild(city);
 li.appendChild(operator);
 li.appendChild(cross);

 userList.appendChild(li);
 
 
cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('users').doc(id).delete();
})
}

  
// db.collection('users').where('operator', '==', 'Airtel').orderBy('name').get().then((snapshot) => {
// snapshot.docs.forEach(doc => {
//    renderUser(doc);
// })
    
// });

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('users').add({
        name: form.Name.value,
        number: form.number.value,
        operator:form.operator.value

    })
    form.Name.value='',
    form.number.value='',
    form.operator.value=''
});

db.collection('users').orderBy('operator').onSnapshot(snapShot => {
    let changes = snapShot.docChanges();
    console.log(changes);
})

