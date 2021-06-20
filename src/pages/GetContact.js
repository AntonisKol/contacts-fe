import'./GetContacts.css'

export default  () => {

    const submitHandler = (e) => {
    e.preventDefault();
    console.log(e);

    let data = new FormData();

    data.append('fullName', e.target[0].value);
    data.append('email', e.target[1].value);
    data.append('phone', e.target[2].value);
    data.append('message', e.target[3].value);
     
    Array.from(e.target[4].files).forEach(file => {
        data.append('attachs', file);
    })
     for (var value of data.values()) {
        console.log(value);
    }
    console.log(Object.fromEntries(data));

    let url = 'https://contacts-app-class.herokuapp.com/get-contact';
    
    let options = {
        method:'POST', 
        body:data
    }
    fetch(url, options).then((data) =>
            data.json().then((output) => {
                if (output.status === "success") {
                    console.log("Congrats");
                } else {
                    console.log(output.message);
                }
            })
        );
    }

    return (
        <div id='get-contact'>
            <form className='contact-form' onSubmit={submitHandler}>
                <input type="text" placeholder='Full Name'/>
                <input type="email" placeholder='Email'/>
                <input type="tel" placeholder='Phone'/>
                <textarea type="text" placeholder='Message'></textarea>
                <input type='file' multiple/>
                <button>Get Contact</button>
            </form>
        </div>
    )
}
