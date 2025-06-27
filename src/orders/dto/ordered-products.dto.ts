import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class OrderedProductsDto {
    @IsNotEmpty({ message: 'product can not be empty.' })
    id: number;

    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'price should be a number & max decimal percission 2.' })
    @IsPositive({ message: 'price can not be negative.' })
    product_unit_price: number;

    @IsNumber({}, { message: 'quantity should be a number.' })
    @IsPositive({ message: 'quantity can not be negative.' })
    product_quantity: number;
}