import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private updateSessionTime = new Subject<any>();
  updatedTimerValue = this.updateSessionTime.asObservable();
  updateTimer(obj: any): any {
    this.updateSessionTime.next(obj);
  }
 
//   getSearchStringValue() {
//     return this.searchStringValue;
//   }
//   constructor(
//     // private readonly restService: RestService
//   ) { }

//   setMessage(message: any): void {
//     this.messageSubject.next(message)
//   }
// isActionlist(data:any):void{
//   this.actionSubject.next(data)
// }
//   setFolderReference(id) {
//     this.folderReference.next(id);
//   }

//   setMoveToListing(data) {
//     this.moveToListing.next(data);
//   }

//   getIntialSelectValue(value: any): void {
//     this.intailizeSelectValues.next(value);

//   }

//   // To set and get the filter values
//   // setSelectedFilterValues(obj,moduleName) {
//   //   if(this.selectedFilterValues){
//   //     this.selectedFilterValues = {};
//   //   }
//   //   this.selectedFilterValues[moduleName] = obj;
//   // }
//   // getSelectedFilterValues(moduleName) {
//   //   if(!this.selectedFilterValues){
//   //     this.selectedFilterValues = {};
//   //   }
//   //   return this.selectedFilterValues[moduleName];
//   // }

//   setSelectedFilterValues(obj) {
//     this.selectedFilterValues = obj;
//   }
//   getSelectedFilterValues() {
//     return this.selectedFilterValues;
//   }

//   setAppliedFilterValues(obj) {
//     this.appliedFilterValues = obj;
//   }
//   getAppliedFilterValues() {
//     return this.appliedFilterValues;
//   }

//   setAppliedRelationshipFilterValues(obj) {
//     this.appliedRelationshipFilterValues = obj;
//   }
//   getAppliedRelationshipFilterValues() {
//     return this.appliedRelationshipFilterValues;
//   }

//   setModuleFilterValues(obj) {
//     this.moduleFilterValues = obj;
//   }
//   getModuleilterValues() {
//     return this.moduleFilterValues;
//   }
//   setAttSelectedFilterValues(obj) {
//     this.attSelectedFilterValues = obj;
//   }
//   getAttSelectedFilterValues() {
//     return this.attSelectedFilterValues;
//   }

//   setAttFilterObj(obj) {
//     this.attFilterObj = obj;
//   }
//   getAttFilterObj() {
//     return this.attFilterObj;
//   }

//   setAttOfFilterTextValues(obj) {
//     this.attFilterTextValues = obj;
//   }
//   getAttOfFilterTextValues() {
//     return this.attFilterTextValues;
//   }

//   setEntitySelectedFilterValues(obj) {
//     this.entitySelectedFilterValues = obj;
//   }
//   getEntitySelectedFilterValues() {
//     return this.entitySelectedFilterValues;
//   }

//   setEntityFilterObj(obj) {
//     this.entityFilterObj = obj;
//   }
//   getEntityFilterObj() {
//     return this.entityFilterObj;
//   }

//   setEntityOfFilterTextValues(obj) {
//     this.entityFilterTextValues = obj;
//   }
//   getEntityOfFilterTextValues() {
//     return this.entityFilterTextValues;
//   }
//   setParentNumber(obj) {
//     this.parentNumber = obj;
//   }
//   getParentNumber() {
//     return this.parentNumber;
//   }
//   // To set and get toast message obj
//   setToastMessage(obj) {
//     this.showtoast.next(obj);
//   }
//   // To set and get dial code
//   setDialCode(obj) {
//     this.dialCode = obj;
//   }
//   getDialCode() {
//     return this.dialCode;
//   }
//   //To set and get Filter object value to retain filter
//   setFilterObjectValues(obj) {
//     this.filterObjectValues = obj;
//   }

//   getFilterObjectValues() {
//     return this.filterObjectValues;
//   }

//   //To set and get filtertext value to pass the API
//   setFilterTextValues(filterText) {
//     this.filterTextValue = filterText;
//   }

//   getFilterTextValues() {
//     return this.filterTextValue;
//   }

//   setIsFromCreate(value) {
//     this.isEntityCreate = value;
//   }

//   getIsFromCreate() {
//     return this.isEntityCreate;
//   }

//   //To set and get serachText
//   setSearchTextValue(searchValue) {
//     this.searchText = searchValue;
//   }

//   getSearchTextValue() {
//     return this.searchText;
//   }

//   hideCompleted = false;
//   setHideCompleted(value) {
//     this.hideCompleted = value;
//   }

//   getHideCompleted() {
//     return this.hideCompleted;
//   }

//   isAssignToMe = false;
//   setIsAssignToMe(value) {
//     this.isAssignToMe = value;
//   }

//   getIsAssignToMe() {
//     return this.isAssignToMe;
//   }

//   isSelectAllAtttachment = false;
//   setIsSelectAllAtttachment(value) {
//     this.isSelectAllAtttachment = value;
//   }

//   getIsSelectAllAtttachment() {
//     return this.isSelectAllAtttachment;
//   }

//   assignId = '';
//   setAssignId(value) {
//     this.assignId = value;
//   }

//   getAssignId() {
//     return this.assignId;
//   }

//   getClientCountry(): string {
//     return this.clientCountry;
//   }

//   setClientCountry(country: string): void {
//     this.clientCountry = country;
//   }
//   getrecordID(): string {
//     return this.recordID;
//   }

//   setrecordID(id: string): void {
//     this.recordID = id;
//   }
//   setDataReviewFilter(filter) {
//     this.dataReviewFilter = filter;
//   }

//   getDataReviewFilter() {
//     return this.dataReviewFilter;
//   }

//   //Tooltip functionality
//   isEllipsisAdded(event: any): boolean {
//     const element = event.target;
//     return element.scrollWidth > element.offsetWidth;
//   }

//   updatedObject(copyData: any, updatedData: any): any {
//     this.editedFields = {};
//     for (const obj of Object.keys(updatedData)) {
//       if (!Array.isArray(obj)) {
//         if (typeof copyData[obj] === 'object' && copyData[obj] !== null) {
//           if (JSON.stringify(copyData[obj]._id) !== JSON.stringify(updatedData[obj]._id)) {
//             this.editedFields[obj] = updatedData[obj];
//           }
//         }
//         else {
//           if (copyData[obj].toString() !== updatedData[obj].toString()) {
//             this.editedFields[obj] = updatedData[obj];
//           }
//         }
//       } else {
//         this.updatedObject(copyData[obj], updatedData[obj]);
//       }
//     }
//     return this.editedFields;
//   }

//   removeHTML(value: any): string {
//     let tempName = '';
//     if (value) {
//       if (value.name) {
//         tempName = value.name.replace(/<\/?[^>]+(>|$)/g, '');
//       } else {
//         tempName = value.replace(/<\/?[^>]+(>|$)/g, '');
//       }
//       if (tempName) {
//         tempName = tempName.trim();
//       }
//       return tempName;
//     }
//     return value;
//   }
//   getResourceType(): any {
//     let url = `${Constants.SLASH}${Constants.RESOURCE_TYPE_URL}${Constants.SLASH}${COMMON_LIST_URL_CONFIG.items}${Constants.QUESTION_MARK}${Constants.RESOURCE_TYPE_FIELD_FOR_LIST}`;
//     url += `${Constants.AMPERSAND}${COMMON_LIST_URL_CONFIG.offset}${Constants.EQUALS_SYMBOL}${this.listParamObj.offset}`;
//     url += `${Constants.AMPERSAND}${COMMON_LIST_URL_CONFIG.limit}${Constants.EQUALS_SYMBOL}${this.listParamObj.limit}`;
//     return this.restService.get(url).pipe(map((res: any) => {
//       if (res) {
//         this.resourceTypes = res.items;
//         return res.items;
//       }
//     }));
//   }
//   getResources(): any {
//     return this.resourceTypes;
//   }
//   setActiveModule(value): void {
//     this.activeModule = value;
//   }
//   getActiveModule(): any {
//     return this.activeModule;
//   }
//   setFilterActiveModule(value): void {
//     this.filterActiveModule = value;
//   }
//   getFilterActiveModule(): any {
//     return this.filterActiveModule;
//   }
//   setFilterCurrentModule(value): void {
//     this.filterCurrentModule = value;
//   }
//   getFilterCurrentModule(): any {
//     return this.filterCurrentModule;
//   }
//   setBase64(data): any {
//     this.base64 = data;
//   }
//   getBase64(): any {
//     return this.base64;
//   }
// //   setModuleHeaderDetails(data): void {
// //     this.headerDetails = data;
// //   }
//   getModuleHeaderDetails(): any {
//     return this.headerDetails;
//   }
//   setCommonLinkSourceData(data: any): void {
//     this.commonSourceData = data;
//   }
//   getCommonLinkSourceData(): any {
//     return this.commonSourceData;
//   }
//   setCommonLinkDestinationData(data: any): void {
//     this.commonDestinationData = data;
//   }
//   getCommonLinkDestinationData(): any {
//     return this.commonDestinationData;
//   }

//   setCommonSourceList(data: any): void {
//     this.commonSourceList = data;
//   }
//   getCommonSourceList(): any {
//     return this.commonSourceList;
//   }

//   // Method to create unique UUID for file upload
//   create_UUID() {
//     let dt = new Date().getTime();
//     let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//       var r = (dt + Math.random() * 16) % 16 | 0;
//       dt = Math.floor(dt / 16);
//       return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//     });
//     return uuid;
//   }

//   // Method to split file into chunks
//   spiltFilesIntoChunks(file, sourceId, moduleName, contentType) {
//     const resources = this.getResources();
//     let data = {
//       sourceType:
//         { _id: resources.find(obj => obj.name.toLowerCase() === moduleName.toLowerCase())._id },
//       source:
//         { _id: sourceId },
//       size: file.size.toString(),
//       fileKey: this.create_UUID()
//     };
//     let offset = 0;
//     const chunkSize = Constants.TWO_MB_CHUNK_SIZE;
//     let chunkArray = [];
//     for (offset = 0; offset <= file.size; offset += chunkSize) {
//       let chunkData: any = {};
//       if ((chunkSize + offset) >= file.size) {
//         data[Constants.IS_LAST_CHUNK] = true;
//       }
//       let tempFile;
//       if (file.size > chunkSize) {
//         let chunkEnd = Math.min(offset + chunkSize, file.size);
//         let chunk = file.slice(offset, chunkEnd);
//         if (contentType) {
//           tempFile = new File([chunk], file.name, { type: contentType });
//         } else {
//           tempFile = new File([chunk], file.name);
//         }

//       } else {
//         tempFile = file;
//       }
//       chunkData.data = JSON.parse(JSON.stringify(data));
//       chunkData.file = tempFile;
//       chunkArray.push(chunkData);
//     }
//     return chunkArray;
//   }

//   getFileList(): any {
//     return this.fileList;
//   }
//   setFileList(files): void {
//     this.fileList = files;
//   }

//   getQuickDateReceivedSelectedValue() {
//     return this.quickDateReceivedSelectedValue;
//   }
//   setQuickDateReceivedSelectedValue(value): void {
//     this.quickDateReceivedSelectedValue = value;
//   }

//   getQuickStatusSelectedValue() {
//     return this.quickStatusSelectedValue;
//   }
//   setQuickStatusSelectedValue(value): void {
//     this.quickStatusSelectedValue = value;
//   }

  // method for convert to date format with grater than less than between formats
//   convertIntoDateFormat(value, convertDateParam) {
//     let dateFormat = moment().subtract(value, convertDateParam);
//     return dateFormat.format('YYYY-MM-DD');
//   }

//   verifyOtp(otp, srcId) {
//     let url = '/validateToken/' + otp + '/srcId/' + srcId;
//     return this.restService.get(url).pipe(map(res => {
//       return res
//     }
//     ))
//   }

//   getSubModuleAccess(id): any {
//     let url = `/UserRole`;
//     url += `/${id}${Constants.QUESTION_MARK}${Constants.SUB_MODULE_ACCESS}`;
//     return this.restService.get(url).pipe(map((response: any) => {
//       return response;
//     }));
//   }

//   getUserRoleAccess(id) {
//     let url = `/Activity/items?filterString=assignTo._id==${id};status._id=in=(1,2)&fields=caseSrc._id,intelSrc._id,infoSrc._id`;
//     return this.restService.get(url).pipe(map((response: any) => {
//       return response;
//     }));
//   }

//   getAllUsers() {
//     let url = '/UserRole/items?offset=0&limit=-1&fields=name&sortBy=-name'
//     return this.restService.get(url).pipe(map((res: any) => {
//       return res.items;
//     }));
//   }

//   setIsBundleExists(flag: Boolean, bundleDetails?: any) {
//     this.isBundleExists = flag;
//     this.bundleDetails = bundleDetails;
//   }

//   getIsBundleExists() {
//     let bundleDetails = {
//       isBundleExists: this.isBundleExists,
//       bundleDetails: this.bundleDetails
//     };
//     return bundleDetails;
//   }

//   subModuleFeaturePreferenceOfActiveModule: any;
//   setSubModuleFeaturePreferenceOfActiveModule(object: any): void{
//     this.subModuleFeaturePreferenceOfActiveModule = object;
//   }
//   getSubModuleFeaturePreferenceOfActiveModule() {
//     return this.subModuleFeaturePreferenceOfActiveModule;
//   }
//   saveCaseEntity(entitytype, moduleName) {
//     let url: any
//     if (moduleName === 'Case') {
//       url = `${Constants.SAVE_CASE_ENTITY_URL}`;
//     }
//     if (moduleName === 'Intelligence') {
//       url = `${Constants.SAVE_INTELLGENCE_ENTITY_URL}`;
//     }
//     if (moduleName === 'Information') {
//       url = `${Constants.SAVE_INFORMATION_ENTITY_URL}`;
//     }
//     return this.restService.save(url, entitytype).pipe(map((response: any) => {
//       return response;
//     }));
//   }
//   UpdateCaseEntity(obj, id, moduleName){
//     let url: any;
//     if (moduleName === 'Case') {
//       url = '/CaseEntity/'+ `${id}`;
//     }
//     if (moduleName === 'Intelligence') {
//       url = '/IntelligenceEntity/'+ `${id}`;
//     }
//     if (moduleName === 'Information') {
//       url = '/InformationEntity/'+ `${id}`;
//     }
//      delete obj.entityId;
//     return this.restService.patch(url, obj).pipe(map((response: any) => {
//       return { success: '' };
//     }));
//   }

//   // Method to save the Filter
//   saveFilters(filterValue, moduleName, filterString) {
//     let data: any = {};
//     data.moduleName = moduleName;
//     data.filterText = JSON.stringify(filterString);
//     data.filterString = JSON.stringify(filterValue);
//     let url = '/UserFilterDetails';
//     return this.restService.save(url, data).pipe(map((response: any) => {
//       return response;
//     }));
//   }

//   // Method to get Saved filter values
//   getSavedFilterValues(moduleName): any {
//     const currentDate = new Date().toISOString();
//     const previousDate = new Date();
//     previousDate.setDate(previousDate.getDate() - 1);
//     const prevDate = previousDate.toISOString();
//     let url = `/UserFilterDetails/userfavoritefilters?fields=filterString,createdOn,filterText&filterString=moduleName==${moduleName};createdBy==${JSON.parse(sessionStorage.getItem('currentUser')).internalUserId}&sortBy=-id`;
//     return this.restService.get(url).pipe(map((response: any) => {
//       return response;
//     }));

//   }

//   // Method to split file import into chunks
//   spiltFilesImportChunks(file,  contentType) {
//     let data = {
//       size: file.size.toString(),
//       fileKey: this.create_UUID()
//     };
//     let offset = 0;
//     const chunkSize = Constants.FOUR_MB_CHUNK_SIZE;
//     let chunkArray = [];
//     for (offset = 0; offset <= file.size; offset += chunkSize) {
//       let chunkData: any = {};
//       if ((chunkSize + offset) >= file.size) {
//         data[Constants.IS_LAST_CHUNK] = true;
//       }
//       let tempFile;
//       if (file.size > chunkSize) {
//         let chunkEnd = Math.min(offset + chunkSize, file.size);
//         let chunk = file.slice(offset, chunkEnd);
//         if (contentType) {
//           tempFile = new File([chunk], file.name, { type: contentType });
//         } else {
//           tempFile = new File([chunk], file.name);
//         }

//       } else {
//         tempFile = file;
//       }
//       chunkData.data = JSON.parse(JSON.stringify(data));
//       chunkData.file = tempFile;
//       chunkArray.push(chunkData);
//     }
//     return chunkArray;
//   }

//   //import samples post method
//   importFileList(file: any, data: any){
//     let url;
//     // let url = `${Constants.SLASH}${Constants.IMPORTSAMPLES}`;
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('initialValues', new Blob([JSON.stringify(data)], {
//     type: 'application/json'
//     }));
//     return this.restService.save(url, formData).pipe(map((response: any) => {
//       return response;
//     }));
//   }

}
