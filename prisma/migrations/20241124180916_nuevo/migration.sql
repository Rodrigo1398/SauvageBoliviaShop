-- DropForeignKey
ALTER TABLE "ProductColorSizeStock" DROP CONSTRAINT "ProductColorSizeStock_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- AddForeignKey
ALTER TABLE "ProductColorSizeStock" ADD CONSTRAINT "ProductColorSizeStock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
