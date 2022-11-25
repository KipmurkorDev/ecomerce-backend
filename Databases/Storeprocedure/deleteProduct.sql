CREATE PROCEDURE deleteProduct(@id_product INT)
  AS
  BEGIN
  DELETE FROM products
  WHERE id_product=@id_product
END