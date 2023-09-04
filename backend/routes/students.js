const router = require('express').Router();
let Student = require('../models/students.model');

//all student details
router.route('/')
.get((req,res)=>
{
    Student.find()
            .then(students => res.json(students))
            .catch(err=> res.status(400).json('Error : '+ err));
})


//student details with specific roll number
router.route('/:roll').get((req,res)=>
{
    Student.findOne({rollnumber:req.params.roll})
            .then(student=> res.json(student))
            .catch(err=> res.status(400).json('Eroor : '+err))
})
.put((req,res)=> {
    const {firstname,secondname} = req.body;
    const {name} = {name:firstname+" "+secondname};
    Student.findOneAndUpdate(
        {rollnumber:req.params.roll},
        {$set : {name}},
        {new :true}
    )
    .then(updatedStudent => {
        if (!updatedStudent) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedStudent);
      })
      .catch(err => res.status(400).json({ error: 'Error: ' + err }));

    
})


// router.route('/').post((req,res)=>
// {
//     // console.log(req.body.rollnumber)
//     Student.findOne({rollnumber:req.body.rollnumber})
//     .then(student=> { res.send(student)})
//     .catch(err=> res.status(400).json('Eroor : '+err))
// })

//to add a student
router.route('/add').post((req,res) =>
{
    const roll = req.body.rollnumber;
    const name = req.body.name;
    const degree = req.body.degree;
    const year = req.body.year;
    const branch = req.body.branch;
    const section = req.body.section;
    
    const newStudent = new Student({
        rollnumber : roll,
        name : name,
        degree : degree,
        year: year,
        branch: branch,
        section: section
    });

    newStudent.save()
              .then(() => res.json("Student added!"))
              .catch((err) => res.status(400).json('Error : '+ err));

})

//to delete a student with specific rollnumber
router.route('/delete/:roll').delete((req,res)=>
{
    Student.findOneAndDelete({rollnumber:req.params.roll})
    .then(()=> res.json("Student deleted"))
    .catch(err=> res.status(400).json('Eroor : '+err))
})


router.route('/update/:roll').put((req,res)=>
{
    Student.findOne({rollnumber:req.params.roll})
    .then(student => {
        student.rollnumber = req.body.rollnumber;
        student.name = req.body.name;
        student.degree = req.body.degree;
        student.year = Number(req.body.year);
        student.branch = req.body.branch;
        student.section = req.body.section;
        
  
        student.save()
          .then(() => res.json('Student updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
    .catch(err=> res.status(400).json('Eroor : '+err))
})
module.exports = router;