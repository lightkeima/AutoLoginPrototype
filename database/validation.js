const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    soNghiQuyet: Joi.string().required(),
    ngayVaoDoan: Joi.string().required(),
    thangVaoDoan: Joi.string().required(),
    namVaoDoan: Joi.string().required(),
    noiVaoDoan:Joi.string().required(),
    password: Joi.string().required(),
    hoTen: Joi.string().required(),
    ngaySinh: Joi.string().required(),
    thangSinh: Joi.string().required(),
    namSinh: Joi.string().required(),
    gioiTinh: Joi.number().integer().required(),
    queQuan: Joi.string().required(),
    danToc: Joi.number().required(),
    soNhaTenDuong: Joi.string().required(),
    xaPhuong: Joi.string().required(),
    quanHuyen: Joi.string().required(),
    tinhTP: Joi.string().required(),
    tinhHinhSucKhoe: Joi.string().required(),
    ngheNghiep: Joi.string().required(),
    daDiNuocNgoai: Joi.bool().required(),
    lyDoDiNuocNgoai: Joi.string(),
    trinhDoHocVan: Joi.string().required(),
    chuyenMonNghiepVu: Joi.string().required(),
    lyLuanChinhTri: Joi.string().required(),
    ngoaiNgu: Joi.string().required(),
    family: Joi.array(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    soNghiQuyet: Joi.string().required(),
    //email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
}

module.exports = {
  registerValidation,
  loginValidation
}
