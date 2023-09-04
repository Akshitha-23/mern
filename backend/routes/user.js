const router = require('express').Router();
let User = require('../models/user_auth.model');

router.route('/').get((req,res) => {
   User.find()
   .then(students => res.json(students))
   .catch(err=> res.status(400).json('Error : '+ err));
});

router.route('/:roll')
  .get((req, res) => {
    User.findOne({ rollnumber: req.params.roll })
      .then(student => {
        if (!student) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.json(student);
      })
      .catch(err => res.status(400).json({ error: 'Error: ' + err }));
  })
  .put((req, res) => {
    const { firstname, secondname, mobile } = req.body;
   console.log(firstname);
    User.findOneAndUpdate(
      { rollnumber: req.params.roll },
      { $set: { firstname, secondname, mobile } },
      { new: true }
    )
      .then(updatedStudent => {
        if (!updatedStudent) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedStudent);
      })
      .catch(err => res.status(400).json({ error: 'Error: ' + err }));
  });

router.route('/register').post(async (req,res) =>
{
   try {
     await User.create({
        rollnumber: req.body.rollnumber,
        password: req.body.password,
        firstname: req.body.firstname,
        secondname: req.body.secondname,
        mobile: req.body.mobile,
     })
     res.json({ status:'ok'})
   } catch (error) {
      res.json({ status: 'error', error: 'The student with the given roll number already exists!!'})
   }

})

router.route('/login').post(async (req,res) =>
{
      const user = await User.findOne({
        rollnumber: req.body.rollnumber,
        password: req.body.password,
     })

    if(user){
        return res.json({status: 'ok', user:true})
    } 
    else{
        return res.json({ status: 'error',user:false})
    }
})
module.exports = router;