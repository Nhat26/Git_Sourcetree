const express = require('express');
const TinNhanRouter = express.Router();
const { ObjectId } = require('mongodb');
const { db } = require('../db')


TinNhanRouter.post("/", async(req, res) => {
    const NhanVien = {
        TinhNhan: req.body.TinhNhan,
        NguoiNhan: req.body.NguoiNhan
    };
    const result = await db.TinNhan.insertOne(NhanVien);

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không thành công"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Thêm thành công",
            data: NhanVien
        })
    }
})

TinNhanRouter.get("/", async(req, res) => {
    const chinhanh = req.params.chinhanh;
    const result = await db.TinNhan.find({

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



// ThongBaoRouter.delete("/:id", async(req, res) => {
//     const id = req.params.id;
//     const body = req.body;
//     const filter = {
//         _id: new ObjectId(id)
//     }
//     const updateDoc = {
//         $set: body
//     }
//     const result = await db.ThongBao.deleteOne(filter);

//     if (!result) {
//         res.json({
//             status: "FAILED",
//             message: "Không có dữ liệu"
//         })
//     } else {
//         res.json({
//             status: "SUCCESS",
//             message: "Lấy được dữ liệu",
//             data: result
//         })
//     }
// })
module.exports = TinNhanRouter;