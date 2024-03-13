// data.js
const data = {
    options: {
      'Doctor': ['Surgeon', 'Cardiologist','Orthopedic','Dentist'],
      'Teacher': ['Physics', 'Maths','Chemistry','Biology'],
      'Lawyer': ['Criminal', 'Cyber','Environmental'],
      'Spa': ['Manicure', 'Pedicure','Facial','Massage'],
      'Engineer': ['Architect', 'Software Engineer','Automobile','Biomedical'],
      'Mechanic': ['Classical', 'Marine','Automotive'],
      'Designer': ['Interior', 'UI/UX','Product','Graphic'],
    },
    details: {
      'Surgeon': [{
            "workspace":"Lions Hospital",
            "name":"Dr. John Doe",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yNV9zaW1wbGVfM2RfaWxsdXN0cmF0aW9uX29mX2FfcmVjb3Zlcnlfcm9vbV93aV80ZjhkNDIwNC02N2I4LTQwMDQtYTBlNy05YjljMjIyMzE2ZGVfMS5qcGc.jpg"
        },
        {
            "workspace":"Lions Hospital",
            "name":"Dr. John Doe",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D"
        },
        {
            "workspace":"Lions Hospital",
            "name":"Dr. John Doe",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D"
        }],

      'Cardiologist': [{
            "workspace":"Nayak Medicare",
            "name":"Dr. Uday Nayak",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D"
        },
        {
            "workspace":"Nayak Medicare",
            "name":"Dr. Uday Nayak",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D"
        },
        {
            "workspace":"Nayak Medicare",
            "name":"Dr. Uday Nayak",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D"
        }],

      'Physics': [{
            "workspace":"Akbar's Academy",
            "name":"Mr.Anand Kumar",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D"
        },
        {
            "workspace":"Akbar's Academy",
            "name":"Mr.Anand Kumar",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D"
        },
        {
            "workspace":"Akbar's Academy",
            "name":"Mr.Anand Kumar",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D"
        }],

      'Maths': [{
            "workspace":"Career Academy",
            "name":"Mrs. Puspha Devi",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D"
        },
        {
            "workspace":"Career Academy",
            "name":"Mrs. Puspha Devi",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D"
        },
        {
            "workspace":"Career Academy",
            "name":"Mrs. Puspha Devi",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D"
        }],
            
      'Criminal': [{
            "workspace":"Lions Hospital",
            "name":"Dr. John Doe",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D"
        },
        {
            "workspace":"Lions Hospital",
            "name":"Dr. John Doe",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D"
        }],
        
      'Cyber': [{
            "workspace":"Lions Hospital",
            "name":"Dr. John Doe",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D"
        },
        {
            "workspace":"Lions Hospital",
            "name":"Dr. John Doe",
            "address":"201-202 Lions Estate, Maharashtra 400071",
            "image":"https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D"
        }]
        
    },
  };
  
  export default data;
  