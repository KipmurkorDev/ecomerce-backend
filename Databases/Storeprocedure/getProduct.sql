CREATE PROCEDURE getproduct(@id_product INT)
  AS
  BEGIN
  SELECT * FROM products
  WHERE id_product=@id_product
END