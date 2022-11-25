CREATE PROCEDURE getProducts
AS
BEGIN
SELECT * FROM products
where isDelete=0


END