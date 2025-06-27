import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty({ message: 'product should not be empty.' })
    @IsNumber({}, { message: 'product id should be a number.' })
    productId: number;

    @IsNotEmpty({ message: 'ratings should not be empty.' })
    @IsNumber({}, { message: 'ratings should be a number.' })
    @Min(0)
    @Max(5)
    ratings: number;

    @IsNotEmpty({ message: 'comment should not be empty.' })
    @IsString({ message: 'comment should be a string.' })
    comment: string;
}
