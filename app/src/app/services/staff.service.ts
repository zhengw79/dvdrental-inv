import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import { lastValueFrom } from "rxjs";
import { BaseService } from "./base.service";
import { StaffType } from "./dto/staff.type";

@Injectable({
	providedIn: "root"
})
export class StaffService extends BaseService {
	async editStaff(payload: StaffType) {
		const {data, errors} = await lastValueFrom(this.apollo.mutate({
			mutation: gql`mutation editStaff($payload: StaffInput!){
				editStaff(payload: $payload) {
					staff_id first_name last_name email }}`,
			variables: { payload }
		}));

		this.redirectToLoginIfError(errors);

		return (data as any).editStaff;
	}
}
