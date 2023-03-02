const express = require('express');
const TaiKhoanRouter = express.Router();
const { ObjectId } = require('mongodb');
const { db } = require('../db')
    // here we create our Route
TaiKhoanRouter.post("/", async(req, res) => {
        const TaiKhoan = {
            Password: req.body.Password,
            VaiTro: req.body.VaiTro,
            Name: req.body.Name,
            ChiNhanh: req.body.ChiNhanh,
            Idchu: req.body.Idchu
        };
        const result = await db.TaiKhoan.insertOne(TaiKhoan);

        if (!result) {
            res.json({
                status: "FAILED",
                message: "Không thêm được tài khoản"
            })
        } else {
            res.json({
                status: "SUCCESS",
                message: "Thêm tài khoản thành công",
                data: TaiKhoan
            })
        }
    })
    // get the

TaiKhoanRouter.get("/", async(req, res) => {
    const result = await db.TaiKhoan.find({}).toArray();

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không có dữ liệu"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Lấy được dữ liệu",
            data: result
        })
    }
})







// get the

TaiKhoanRouter.get("/khanh", async(req, res) => {
    const result = await db.TaiKhoan.find({}).toArray();

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không có dữ liệu"
        })
    } else {
        res.json(result)
    }
})

//get the
TaiKhoanRouter.get("/:id", async(req, res) => {
    const id = req.params.id;
    const result = await db.TaiKhoan.find({
        _id: ObjectId(id),
    }).toArray();

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không có dữ liệu"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Lấy được dữ liệu",
            data: result
        })
    }
})

//get the
TaiKhoanRouter.put("/:id", async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const filter = {
        _id: new ObjectId(id)
    }
    const updateDoc = {
        $set: body
    }
    const result = await db.TaiKhoan.updateOne(filter, updateDoc);

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không có dữ liệu"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Lấy được dữ liệu",
            data: result
        })
    }
})

TaiKhoanRouter.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const filter = {
        Idchu: id
    }
    const updateDoc = {
        $set: body
    }
    const result = await db.TaiKhoan.deleteOne(filter);

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không có dữ liệu"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Lấy được dữ liệu",
            data: result
        })
    }
})

module.exports = TaiKhoanRouter;