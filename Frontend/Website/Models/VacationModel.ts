export class VacationModel {
    _id!: string;
    destination!: string;
    description!: string;
    startDate!: string;
    endDate!: string;
    price!: number;
    imageName!: FileList;
    imageUrl!: string;

    likesCount!: number;
    isLikedByMe!: boolean;

    latitude!: number;
    longitude!: number;

}