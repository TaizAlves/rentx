interface IDateProvider {
  compareHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  compareinDays(start_date: Date, end_date: Date ): number;
}

export { IDateProvider };
