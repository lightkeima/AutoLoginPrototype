curl --header "Content-Type: application/json" \
  --header "X-Api-Key: LMAO" \
  --request POST \
  --data '{ 
    "soNghiQuyet": "9", 
    "hoTen": "req body hoTen", 
    "password": "req.body.pawssssssss", 
    "gioiTinh": "2", 
    "queQuan": "req.body.queQuan", 
    "danToc": "req.body.danToc", 
    "noiOHienNay": "req.body.noiOHienNay", 
    "tinhHinhSucKhoe": "req.body.tinhHinhSucKhoe", 
    "ngheNghiep": "req.body.ngheNghiep", 
    "daDiNuocNgoai": "true",
    "lyDoDiNuocNgoai": "req.body.lyDoDiNuocNgoai", 
    "trinhDoHocVan": "req.body.trinhDoHocVan", 
    "chuyenMonNghiepVu": "req.body.chuyenMonNghiepVu", 
    "lyLuanChinhTri": "req.body.lyLuanChinhTri", 
    "ngoaiNgu": "req.body.ngoaiNgu", 
    "familyMember":[ 
	{ 
      	"quanHe": "1", 
      	"ten": "familyMember[i].ten", 
      	"diaChi": "familyMembers[i].diaChi"}, 
	{ 
      	"quanHe": "2", 
      	"ten": "familyMember[i].ten1", 
      	"diaChi": "familyMembers[i].diaChi1"}] 
  }' \
  http://localhost:3000/api/user/register





curl --header "Content-Type: application/json" --header "X-Api-Key: LMAO" --request POST --data '{ "id": "0", "web_id": "0", "username": "lightkema","password": "lulkeilmao139865"}' http://localhost:3000/api/addaccount
curl --header "Content-Type: application/json" --header "X-Api-Key: LMAO" --request POST --data '{"id": "0", "url": "https://id.blogtruyen.vn/dang-nhap","name_of_id_field": "UserName","name_of_password_field": "Password","name_of_button": "","submit_type": "true", "name_of_form": "form1","id_find_by": "name", "pass_find_by": "name", "button_find_by": "name", "form_find_by": "id"}' http://localhost:8080/api/addurl
curl --header "Content-Type: application/json" --header "X-Api-Key: LMAO" --request POST --data '{"id": "1", "url": "https://www.facebook.com","name_of_id_field": "email","name_of_password_field": "pass","name_of_button": "","submit_type": "false", "name_of_form": "","id_find_by": "name", "pass_find_by": "name", "button_find_by": "name", "form_find_by": "name"}' http://localhost:8080/api/addurl


curl --header "Content-Type: application/json" --header "X-Api-Key: LMAO" --request POST --data '{"url": "https://id.blogtruyen.vn/dang-nhap"}' http://localhost:8080/api/url