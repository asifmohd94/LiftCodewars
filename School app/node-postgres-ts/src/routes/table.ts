import express, { Express } from 'express';
import { pool } from '../config/db'

export const router = express.Router();

router.get('/student', async (req, res) => {
    if (Object.keys(req.query).length == 0) {
        res.status(400)
            .send({ message: "Enter a query" });
    }
    try {
        const result = await pool.query("Select * FROM student_addmission where enroll_number=$1 OR first_name = $2 OR last_name= $3 OR fathers_name = $4 OR mothers_name = $5;", [req.query.enroll, req.query.firstname, req.query.lastname, req.query.fathersname, req.query.mothersname]);
        res.send(result.rows);
    } catch (err) {
        console.log(err)
        res.status(404)
            .send({ message: "Entered student not found" });

    }
})

router.get('/teacher', async (req, res) => {
    if (Object.keys(req.query).length == 0) {
        res.status(400)
            .send({ message: "Enter a query" });
    }

    try {
        const result = await pool.query("SELECT * FROM teacher WHERE  first_name = $1 OR email = $2 OR phone = $3 OR emp_id = $4;", [req.query.name, req.query.email, req.query.phone, req.query.id]);
        res.send(result.rows);
    } catch (err) {
        console.log(err);
        res.status(404)
            .send({ message: "Entered teacher not found" });
    }
});

router.get('/find', async (req, res) => {
    if (Object.keys(req.query).length == 0) {
        res.status(400)
            .send({ message: "Enter a query" });
    }

    try {
        const result = await pool.query("SELECT sa.first_name AS student_name,st.current_grade AS grade,tg.emp_id,tr.first_name AS teacher_name FROM student_addmission AS sa INNER JOIN student AS st ON sa.enroll_number = st.enroll_number INNER JOIN teacher_grade tg ON st.current_grade = tg.grade INNER JOIN teacher tr ON tg.emp_id = tr.emp_id WHERE st.current_grade = $1 OR sa.first_name = $2 OR tr.first_name = $3", [req.query.grade, req.query.studentname, req.query.teachername]);
        res.send(result.rows);

    } catch (err) {
        console.error(err);
        res.status(404)
            .send({ message: "Not found" });
    }
})

router.post('/teacher/subject', async (req, res) => {

    try {
        const result = await pool.query("INSERT INTO public.teacher_grade(emp_id, subject_code, grade) VALUES($1, $2 ,$3)", [req.body.emp_id, req.body.subject_code, req.body.grade]);
        res.send("Created");
    } catch (err) {
        console.log(err);
        res.status(500)
            .send({ message: "Internal server error" })
    }
})

router.post('/student/create', async (req, res) => {

    try {
        const result = await pool.query("INSERT INTO public.student_addmission(enroll_number, first_name, last_name, dob, fathers_name, mothers_name, address, gender, contact_phone,  session_id, addmission_grade) VALUES($1, $2, $3, $4, $5, $6,$7, $8, $9, $10, $11)", [req.body.enroll_number, req.body.first_name, req.body.last_name, req.body.dob, req.body.fathers_name, req.body.mothers_name, req.body.address, req.body.gender, req.body.contact_phone, req.body.session_id, req.body.addmission_grade]);
        res.send(result.rows)
    } catch (err) {
        console.error(err);
        res.status(500)
            .send({ message: "Internal Server Error" });
    }
})

// router.post('/student/addmission', async (req, res) => {

//     try {
//         console.log(req.body);

//         let query = "INSERT INTO public.student_addmission(enroll_number, first_name, last_name, dob, fathers_name, mothers_name, address, gender, contact_phone,session_id, addmission_grade) VALUES ";
//         let values = [];
//         let x = 1;
//         let temp = "";

//         for (let i = 0; i < req.body.length; i++) {
//             temp += "("

//             for (let j = 0; j < 10; j++) {
//                 temp += "$" + x + ",";
//                 x++;
//             }
//             temp = temp.substring(0, temp.length - 1);
//             temp += "),";
//             query += temp;
//             values.push(req.body[i].enroll_number);
//             values.push(req.body[i].first_name);
//             values.push(req.body[i].last_name);
//             values.push(req.body[i].dob);
//             values.push(req.body[i].fathers_name);
//             values.push(req.body[i].mothers_name);
//             values.push(req.body[i].address);
//             values.push(req.body[i].gender);
//             values.push(req.body[i].contact_phone);
//             values.push(req.body[i].session_id);
//             values.push(req.body[i].addmission_grade);
//             temp = "";
//         }

//         query = query.substring(0, query.length - 1);
//         query += ";"

//         const result = await pool.query(query, values);
//         res.send(result.rows);
//     } catch (err) {
//         console.log(err);
//         res.status(500)
//             .send({ message: "Internal Server Error" });

//     }
// })

router.post('/student/addmission', async (req, res) => {
    try {
        console.log(req.body);
        const result = await pool.query("INSERT INTO public.student_addmission(enroll_number, first_name, last_name, dob, fathers_name, mothers_name, address, gender,session_id, addmission_grade) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)", [req.body.enroll_number, req.body.first_name, req.body.last_name, req.body.dob, req.body.fathers_name, req.body.mothers_name, req.body.address, req.body.contact_phone, req.body.session_id, req.body.addmission_grade]);
        res.send(result.rows);
    } catch (err) {
        console.log(err)
    }
})


router.post('/teacher/create', async (req, res) => {
    try {
        const result = await pool.query("INSERT INTO public.teacher(emp_id, first_name, last_name, gender, phone, email, address, primary_subject) VALUES($1, $2, $3, $4, $5, $6, $7, $8)", [req.body.emp_id, req.body.first_name, req.body.last_name, req.body.gender, req.body.phone, req.body.address, req.body.email, req.body.primary_subject]);
        res.send("Created");
    } catch (err) {
        console.log(err);
        res.status(500)
            .send({ message: "Internal Server Error" });

    }
})

router.post('/teacher/bulkcreate', async (req, res) => {

    try {
        console.log(req.body);
        let query = "INSERT INTO public.teacher(emp_id, first_name, last_name, gender, phone, email, address, primary_subject) VALUES ";
        let values = [];
        let x = 1;
        let temp = "";
        for (let i = 0; i < req.body.length; i++) {
            temp += "(";
            for (let j = 0; j < 8; j++) {
                temp += "$" + x + ",";
                x++;
            }
            temp = temp.substring(0, temp.length - 1);
            temp += "),";
            query += temp;
            values.push(req.body[i].emp_id);
            values.push(req.body[i].first_name);
            values.push(req.body[i].last_name);
            values.push(req.body.gender);
            values.push(req.body.phone);
            values.push(req.body[i].email);
            values.push(req.body[i].address);
            values.push(req.body[i].primary_subject);
            temp = "";

        }
        query = query.substring(0, query.length - 1);
        query += ";"
        console.log(query);
        console.log(values);

        const result = await pool.query(query, values);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500)
            .send({ message: "Internal Server Error" });

    }
})


router.put('/update/session', async (req, res) => {
    if (Object.keys(req.query).length == 0) {
        res.status(400)
            .send({ message: "Enter a query" });
    }

    try {
        const result = await pool.query("UPDATE public.student SET current_grade = $1, current_session = $2 WHERE enroll_number = $3", [req.body.current_grade, req.body.current_session, req.query.enroll])
        res.send("Updated");
    } catch (err) {
        console.log(err);
        res.status(404)
            .send({ message: "Entered student is not present" });

    }
})


