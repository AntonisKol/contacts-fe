import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Card from '../components/Card';

function Contacts() {
 
let history = useHistory();
useEffect(() => {
  if (!localStorage.getItem('token')) {
    history.push('/auth')
  }
})

    const headers = {
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('token')
}
 
  const [form, setForm] = useState({
  fullName: '', 
  email: '', 
  phone: '', 
  address: ''
});
  
  const [contacts, setContacts] = useState([{
    _id:"1",
    fullName: 'test',
    email: 't@t.com',
    phone: '123456',
    address: 'test'}
  ]);

  const fillForm = (e, field) => {
    let newForm = {...form};
    newForm[field] = e.target.value;
    setForm(newForm);
  }

 const formSubmitHandler = (e) => {
   e.preventDefault();

let finalForm = new FormData();
finalForm.append('fullName', form.fullName);
finalForm.append('email', form.email);
finalForm.append('phone', form.phone);
finalForm.append('address', form.address);
finalForm.append('file', e.target[4].files[0])
console.log('finalForm', finalForm);

    const url = 'https://contacts-app-class.herokuapp.com/contacts/new';
    const options = {
      method: "POST",
      headers:{
        'x-auth-token': localStorage.getItem('token')
    },
       body: finalForm
    }
    fetch(url, options).then(data => data.json().then(output => setContacts([...contacts, output])))
 }
 
  useEffect(() => {
  const url ='https://contacts-app-class.herokuapp.com/contacts/all';
  const options = {
    headers 
  }
  fetch(url, options).then(data => data.json().then(output => {
    if (output.status ==='success') {
    setContacts(output.data);
    } else {
      console.log(output.message);
    }
  })); 
}, []
);

const deleteContactHandler = (id) => {

  const url ='https://contacts-app-class.herokuapp.com/contacts/'+ id;
  const options = {
    method: "DELETE",
    headers
  }
  fetch(url, options)
  .then(response => response.json().then(output => {
    
  if(output.status === 'success'){
    alert(output.message);
    let newList = contacts.filter(contact => {
      if(contact._id !== output.data){
        return contact
      }
     });
    setContacts(newList);
  } else {
      alert('There is an error. Check console for details')
      console.log(output.message);
   }
  }))
  .catch(err=>{
    alert(err)
  })
}

let cards = [];
if (typeof(contacts) =='object' && contacts.length > 0) {
  cards = contacts.map(contact => <Card  
    key={contact['_id']}  
     contact = {contact}
    deleteContact = {deleteContactHandler.bind(this,contact['_id'])}
    />);
}  

 return (

    <div className="App">
      <form className="form" onSubmit={formSubmitHandler}>
    <input required placeholder="Full name" value={form.fullName} onChange= {(e) => fillForm(e, 'fullName')}/>
    <input type="email"  placeholder="Email" value={form.email}  onChange= {(e) => fillForm(e, 'email')}/>
    <input type="tel" placeholder="Phone number" value={form.phone}  onChange= {(e) => fillForm(e, 'phone')}/>
    <input placeholder="Address" value={form.address}  onChange= {(e) => fillForm(e, 'address')}/>
    <input type='file'/>
    <button className='create-button'>Create Contact</button>
    </form>

    <section className='contact-list'>
      {cards}
    </section>
    </div>
  );
}

export default Contacts;
