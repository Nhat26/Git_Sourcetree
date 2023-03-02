const express = require('express');
const HoaDonRouter = express.Router();
const { ObjectId } = require('mongodb');
const { db } = require('../db')




HoaDonRouter.post("/", async(req, res) => {
    const VatTu = {
        SanPham: [req.body.hoadon],
        NgayBan: new Date(req.body.NgayBan),
        ChiNhanh: req.body.ChiNhanh,
        Gia: parseInt(req.body.Gia),
        NguoiBan: req.body.NguoiBan
    };
    const result = await db.HoaDon.insertOne(VatTu);

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không thành công"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "thành công",
            data: VatTu
        })
    }
})


HoaDonRouter.get("/", async(req, res) => {
    const chinhanh = req.params.chinhanh;
    const result = await db.HoaDon.find({

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







// HoaDonRouter.get("/hd/:thang/:nam", async(req, res) => {
//     const chinhanh = req.params.chinhanh;
//     const thang = req.params.thang;
//     const nam = req.params.nam;
//     const result = await db.HoaDon.find({

//     }).toArray();

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


HoaDonRouter.get("/h/:hoadoncua", async(req, res) => {
    const chinhanh = req.params.hoadoncua;
    const result = await db.HoaDon.find({
        NguoiBan: chinhanh,
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
HoaDonRouter.get("/c/:chinhanh", async(req, res) => {
    const chinhanh = req.params.chinhanh;
    const result = await db.HoaDon.find({
        ChiNhanh: chinhanh,
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
HoaDonRouter.put("/change/:id", async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const filter = {
        _id: new ObjectId(id)
    }
    const updateDoc = {
        $set: {
            SanPham: req.body.SanPham,
            Gia: req.body.Gia,
         
        }
    }
    const result = await db.HoaDon.updateOne(filter, updateDoc);

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



module.exports = HoaDonRouter;