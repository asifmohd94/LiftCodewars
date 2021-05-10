import express, { Express } from 'express';
import { pool } from '../config/db'

export const router = express.Router();

router.get('/student', async (req, res) => {
    try {
        const result = await pool.query("Select * FROM student_addmission where enroll_number=$1 OR first_name = $2 OR last_name= $3 OR fathers_name = $4 OR mothers_name = $5;", [req.query.enroll, req.query.firstname, req.query.lastname, req.query.fathersname, req.query.mothersname]);
        res.send(result.rows);
    } catch {
        console.log(console.log("Error"));

    } finally {
        pool.end();
    }
})

router.get('/teacher', async (req, res) => {
    try {

        const result = await pool.query("SELECT * FROM teacher WHERE  first_name = $1 OR email = $2 OR phone = $3 OR emp_id = $4;", [req.query.name, req.query.email, req.query.phone, req.query.id]);
        res.send(result.rows);
    } catch {
        console.log("Error occured");

    } finally {
        pool.end();
    }
});


router.get('/find', async (req, res) => {
    try {
        const result = await pool.query("SELECT sa.first_name AS student_name,st.current_grade AS grade,tg.emp_id,tr.first_name AS teacher_name FROM student_addmission AS sa INNER JOIN student AS st ON sa.enroll_number = st.enroll_number INNER JOIN teacher_grade tg ON st.current_grade = tg.grade INNER JOIN teacher tr ON tg.emp_id = tr.emp_id WHERE st.current_grade = $1 OR sa.first_name = $2 OR tr.first_name = $3", [req.query.grade, req.query.studentname, req.query.teachername]);
        res.send(result.rows);

    } catch {
        console.error("Error occured");
    } finally {
        pool.end();
    }
})


router.post('/student/create', async (req, res) => {
    try {
        const result = await pool.query("INSERT INTO public.student_addmission(enroll_number, first_name, last_name, dob, fathers_name, mothers_name, address, gender, contact_phone,  session_id, addmission_grade) VALUES($1, $2, $3, $4, $5, $6,$7, $8, $9, $10, $11)", [req.body.enroll_number, req.body.first_name, req.body.last_name, req.body.dob, req.body.fathers_name, req.body.mothers_name, req.body.address, req.body.gender, req.body.contact_phone, req.body.session_id, req.body.addmission_grade]);
        res.send(result.rows)
    } catch {
        console.error("Error occured");
    } finally {
        pool.end();
    }
})


router.post('/teacher/subject', async (req, res) => {
    try {
        const result = await pool.query("INSERT INTO public.teacher_grade(emp_id, subject_code, grade) VALUES($1, $2 ,$3)", [req.body.emp_id, req.body.subject_code, req.body.grade]);
        res.send("Created");
    } catch {
        console.log("error occured")
    } finally {
        pool.end();
    }
})

router.put('/update/session', async (req, res) => {
    try {
        const result = await pool.query("UPDATE public.student SET current_grade = $1, current_session = $2 WHERE enroll_number = $3", [req.body.current_grade, req.body.current_session, req.query.enroll])
        res.send("Updated");
    } catch {
        console.log("Error occured")
    } finally {
        pool.end();
    }
})


