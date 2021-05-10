const express = require('express');
const pool = require('../config/db')
const router = express.Router();




router.get('/student', async (req, res) => {
    const result = await pool.query("Select * FROM student_addmission where enroll_number=$1 OR first_name = $2 OR last_name= $3 OR fathers_name = $4 OR mothers_name = $5;", [req.query.enroll, req.query.firstname, req.query.lastname, req.query.fathersname, req.query.mothersname]);
    res.send(result.rows);

})


router.get('/teacher', async (req, res) => {
    const result = await pool.query("SELECT * FROM teacher WHERE  first_name = $1 OR email = $2 OR phone = $3 OR emp_id = $4;", [req.query.name, req.query.email, req.query.phone, req.query.id]);
    res.send(result.rows)
})


router.get('/find', async (req, res) => {
    const result = await pool.query("SELECT sa.first_name AS student_name,st.current_grade AS grade,tg.emp_id,tr.first_name AS teacher_name FROM student_addmission AS sa INNER JOIN student AS st ON sa.enroll_number = st.enroll_number INNER JOIN teacher_grade tg ON st.current_grade = tg.grade INNER JOIN teacher tr ON tg.emp_id = tr.emp_id WHERE st.current_grade = $1 OR sa.first_name = $2 OR tr.first_name = $3", [req.query.grade, req.query.studentname, req.query.teachername]);
    res.send(result.rows);

})


router.post('/create', async (req, res) => {
    const { grade, emp_id, session_id } = req.body
    const result = await pool.query("INSERT INTO public.class_grade(grade, emp_id, session_id) VALUES($1,$2,$3)", [req.body.grade, req.body.emp_id, req.body.session_id])
    console.log(req.body);
    res.send('Created')
})


router.post('/student/create', async (req, res) => {
    const result = await pool.query("INSERT INTO public.student_addmission(enroll_number, first_name, last_name, dob, fathers_name, mothers_name, address, gender, contact_phone,  session_id, addmission_grade) VALUES($1, $2, $3, $4, $5, $6,$7, $8, $9, $10, $11)", [req.body.enroll_number, req.body.first_name, req.body.last_name, req.body.dob, req.body.fathers_name, req.body.mothers_name, req.body.address, req.body.gender, req.body.contact_phone, req.body.session_id, req.body.addmission_grade]);
    res.send(result.rows);
})


router.post('/teacher/create', async (req, res) => {
    const result = await pool.query("INSERT INTO public.teacher(emp_id, first_name, last_name, gender, phone, email, address, primary_subject) VALUES($1, $2, $3, $4, $5, $6, $7, $8)", [req.body.emp_id, req.body.first_name, req.body.last_name, req.body.gender, req.body.phone, req.body.address, req.body.email, req.body.primary_subject]);
    res.send("Created")
})

router.post('/teacher/subject', async (req, res) => {
    const result = await pool.query("INSERT INTO public.teacher_grade(emp_id, subject_code, grade) VALUES($1, $2 ,$3)", [req.body.emp_id, req.body.subject_code, req.body.grade]);
    res.send("Created")
})


router.put('/update/session', async (req, res) => {
    const result = await pool.query("UPDATE public.student SET current_grade = $1, current_session = $2 WHERE enroll_number = $3", [req.body.current_grade, req.body.current_session, req.query.enroll])
    res.send("Updated")
})




module.exports = router;