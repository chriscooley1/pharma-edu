# API Design Document

TODO: Verify parameters and paths
TODO: Fix any of the datetimes to be actual examples
TODO: Fix any ?'s
TODO: Fix the patient and prescriber APIs to match the new models

## Overview

### Purpose

A brief description of the purpose and scope of the API. Explain what the API is designed to do and its intended audience.

### Goals

- List the primary goals of the API.
- Define the key functionalities it aims to provide.

### Assumptions

Outline any assumptions made during the design process.

## API Overview

### Base URL

Until the API is hosted, the base url will be set by `uvicorn` when running locally. Usually this is `http://localhost:8000`, assuming the default port of `8000`.

### Authentication

As the data is all dummy data, there is no need to keep data secure. Students will be able to sign in using their first name as the username and their last name as the password.

All API calls should be made with the user ID in the header:

```json
{
  "X-User-Id": 17
}
```

## Endpoints

### Logging In/Out

#### POST /login

##### Description

Logs the user in. NOTE: None of this will be secured, don't use actual real passwords.

##### Request Parameters

- **Path Parameters:**
  - None
- **Query Parameters:**
  - None
- **Body Parameters:**
  - `username`: string
  - `password`: string

##### Response

- Status Codes:
  - 200 Created: Successfully logged in.
  - 400 Bad Request: Malformed body sent to the API.

##### Response Example

```json
{
  "x-user-id": 123
}
```

#### POST /logout

##### Description

Logs the user out. The user logged out is determined by the `X-User-Id` header.

##### Request Parameters

- **Path Parameters:**
  - None.
- **Query Parameters:**
  - None.
- **Body Parameters:**
  - None.

##### Response

- Status Codes:
  - 204 No Content: Successfully logged out.
  - 401 Unauthorized: Missing the required `X-User-Id` header

### Patients

#### GET /patients

##### Description

Retrieves a list of patient records. Because the number of records will be very small, there is no need to limit or filter the results that come back.

##### Request Parameters

- **Path Parameters:**
  - None
- **Query Parameters:**
  - None

##### Response

- Status Codes:
  - 200 OK: List of patients successfully returned.
  - 401 Unauthorized: Missing the required `X-User-Id` header

##### Response Example

TODO: Fix the datetimes

```json
[
  {
      "id": 123,
      "first_name": "Tony",
      "last_name": "Stark",
      "date_of_birth": datetime
  }
]
```

#### GET /patients/:patient_id

##### Description

Gets the patient profile, including a list of the prescriptions the patient currently has.

##### Request Parameters

- **Path Parameters:**
  - `patient_id`: ID of the patient.
- **Query Parameters:**
  - None.

##### Response

- Status Codes:
  - 200 OK: Patient profile successfully retrieved.
  - 401 Unauthorized: Missing the required `X-User-Id` header
  - 404 Not Found: Patient not found.

##### Response Example

```json
{
  "patient_id": 123,
  "first_name": "Thor",
  "last_name": "Odinson",
  "date_of_birth": datetime,
  "address": "123 Web Dev Road, St. George, UT 84770",
  "primary_prescriber_id": 234,
  "allergies": "fish, happiness, light",
  "insurance_bin": ?,
  "insurance_pcn": ?,
  "insurance_person_code": ?,
  "insurance_id": ?,
  "insurance_group_number": ?,
  "prescriptions": [
    {
      "rx_number": 13,
      "rx_item_name": "Red Pill",
      "quantity": 30,
      "refills": 3
    }
  ]
}
```

#### POST /patients

##### Description

Creates a patient.

##### Request Parameters

- **Path Parameters:**
  - None
- **Query Parameters:**
  - None
- **Body Parameters:**
  - `first_name`: string
  - `last_name`: string
  - `date_of_birth`: string
  - `address`: string
  - `primary_prescriber_id`: string
  - `allergies`: string
  - `insurance_bin`: "...",
  - `insurance_pcn`: "...",
  - `insurance_person_code`: "...",
  - `insurance_id`: "...",
  - `insurance_group_number`: "..."

##### Response

- Status Codes:
  - 201 Created: Patient successfully created.
  - 400 Bad Request: Malformed body sent to the API.
  - 401 Unauthorized: Missing the required `X-User-Id` header

##### Response Example

```json
{
  "patient_id": 123
}
```

#### PATCH /patients/:patient_id

##### Description

Updates a patient. All fields are optional and only those fields will be updated.

##### Request Parameters

- **Path Parameters:**:
  - patient_id: ID of the patient
- **Query Parameters:**
  - None
- **Body Parameters:**:
  - `first_name?`: string
  - `last_name?`: string
  - `date_of_birth?`: string
  - `address?`: string
  - `primary_prescriber_id?`: string
  - `allergies?`: string
  - `insurance_bin?`: "...",
  - `insurance_pcn?`: "...",
  - `insurance_person_code?`: "...",
  - `insurance_id?`: "...",
  - `insurance_group_number?`: "..."

##### Response

- Status Codes:
  - 204 No Content: Patient successfully updated.
  - 400 Bad Request: Malformed body sent to the API.
  - 401 Unauthorized: Missing the required `X-User-Id` header
  - 404 Not Found: Patient not found.

#### DELETE /patients/:patient_id

##### Description

Deletes a patient.

##### Request Parameters

- **Path Parameters:**
  - `patient_id`: ID of the patient to delete.
- **Query Parameters:**
  - None.
- **Body Parameters:**
  - None.

##### Response

- Status Codes:
  - 204 No Content: Patient successfully deleted
  - 401 Unauthorized: Missing the required `X-User-Id` header
  - 404 Not Found: Patient not found.

### Prescriptions

#### GET /prescriptions

##### Description

Get a list of all prescriptions.

##### Request Parameters

- **Path Parameters:**
  - None.
- **Query Parameters:**
  - `limit?`: An optional parameter to limit how many results are returned. Defaults to 100.
  - `patient_id?`: An optional patient ID to filter by.
  - `status?`: An optional prescription status to filter by (PENDING, COMPLETED, SOLD).

##### Response

- Status Codes:
  - 200 OK: Description of the successful response.
  - 401 Unauthorized: Missing the required `X-User-Id` header

##### Response Example

```json
[
  {
    "rx_number": 123,
    "fisrt_name": "Tony Stark",
    "last_name": "Tony Stark",
    "date_of_birth": datetime
  }
]
```

#### POST /prescriptions

##### Description

Creates a prescription.

##### Request Parameters

- **Path Parameters:**
  - None.
- **Query Parameters:**
  - None.
- **Body Parameters:**
  - `patient_id`: ID of the patient.
  - `prescriber_id`: ID of the prescriber.
  - `rx_item_id`: ID of the Rx item being prescribed.
  - `directions`: The directions that will be on the printed label.
  - `quantity`: The quantity of items in the prescription.
  - `quantity_dispensed`: The quantity actually dispensed to the patient.
  - `refills`: Number of refills.
  - `image_id`: ID of the scanned image.
  - `tech_id`: ID of the pharmacy technician filling the prescription.

##### Response

- Status Codes:
  - 201 Created: Prescription successfully created.
  - 400 Bad Request: Malformed body sent to the API.
  - 401 Unauthorized: Missing the required `X-User-Id` header

##### Response Example

```json
{
  "rx_number": 123
}
```

#### PATCH /prescriptions/:rx_number

##### Description

Updates a prescription's refills and/or status. Both fields are optional.

##### Request Parameters

- **Path Parameters:**
  - `rx_number`: The Rx number to update.
- **Query Parameters:**
  - None.
- **Body Parameters:**
  - `refills?`: Number of refills.
  - `status?`: Current status of the prescription, either PENDING, COMPLETED, or SOLD.

##### Response

- Status Codes:
  - 204 No Content: Prescription successfully updated.
  - 400 Bad Request: Malformed body sent to the API.
  - 401 Unauthorized: Missing the required `X-User-Id` header
  - 404 Not Found: Prescription not found.

#### DELETE /prescriptions/:rx_number

##### Description

Deletes a prescription.

##### Request Parameters

- **Path Parameters:**
  - `rx_number`: The Rx number of the prescription to delete.
- **Query Parameters:**
  - None.
- **Body Parameters:**
  - None.

##### Response

- Status Codes:
  - 204 No Content: Prescription successfully deleted.
  - 401 Unauthorized: Missing the required `X-User-Id` header
  - 404 Not Found: Prescription not found.

### Prescribers

#### GET /prescribers

##### Description

Retrieves a list of prescribers. Because the number of records will be very small, there is no need to limit or filter the results that come back.

##### Request Parameters

- **Path Parameters:**
  - None.
- **Query Parameters:**
  - None.

##### Response

- Status Codes:
  - 200 OK: List of prescribers successfully returned.
  - 401 Unauthorized: Missing the required `X-User-Id` header

##### Response Example

```json
[
  {
    "prescriber_id": 123,
    "first_name": "Stephen",
    "last_name": "Strange",
    "type": "MD",
    "address": "456 Subnautica Lane, St. George, UT 84770",
    "phone_number": "435-123-4567",
    "dea": ?,
    "npi": ?
  }
]
```

#### POST /prescribers

##### Description

Creates a prescriber.

##### Request Parameters

- **Path Parameters:**
  - None.
- **Query Parameters:**
  - None.
- **Body Parameters:**
  - `first_name`: First name of the prescriber.
  - `last_name`: Last name of the prescriber.
  - `type`: Type of prescriber (MD, DO, etc).
  - `address`: Address of the prescriber's office.
  - `phone_number`: Phone number of the prescriber's office.
  - `dea`: ?
  - `npi`: ?

##### Response

- Status Codes:
  - 201 Created: Prescriber successfully created.
  - 400 Bad Request: Malformed body sent to the API.
  - 401 Unauthorized: Missing the required `X-User-Id` header

##### Response Example

```json
{
  "prescriber_id": 123
}
```

#### PATCH /prescribers/:prescriber_id

##### Description

Updates a prescriber. All fields are optional and only those fields will be updated.

##### Request Parameters

- **Path Parameters:**
  - `prescriber_id`: ID of the prescriber.
- **Query Parameters:**
  - None.
- **Body Parameters:**
  - `first_name?`: First name of the prescriber.
  - `last_name?`: Last name of the prescriber.
  - `type?`: Type of prescriber (MD, DO, etc).
  - `address?`: Address of the prescriber's office.
  - `phone_number?`: Phone number of the prescriber's office.
  - `dea?`: ?
  - `npi?`: ?

##### Response

- Status Codes:
  - 204 No Content: Prescriber successfully updated.
  - 400 Bad Request: Malformed body sent to the API.
  - 401 Unauthorized: Missing the required `X-User-Id` header
  - 404 Not Found: Prescriber not found.

#### DELETE /prescribers/:prescriber_id

##### Description

Deletes a prescriber.

##### Request Parameters

- **Path Parameters:**
  - `prescriber_id`: ID of the prescriber.
- **Query Parameters:**
  - None.
- **Body Parameters:**
  - None.

##### Response

- Status Codes:
  - 204 No Content: Prescriber successfully deleted
  - 401 Unauthorized: Missing the required `X-User-Id` header
  - 404 Not Found: Prescriber not found.

### Rx Items

#### GET /rx-items

##### Description

Retrieves a list of Rx items. Because the number of records will be very small, there is no need to limit or filter the results that come back.

##### Request Parameters

- **Path Parameters:**
  - None.
- **Query Parameters:**
  - None.

##### Response

- Status Codes:
  - 200 OK: List of Rx items successfully returned.
  - 401 Unauthorized: Missing the required `X-User-Id` header

##### Response Example

```json
[
  {
    "rx_item_id": 123,
    "name": "Red Pill",
    "strength": "750mg",
    "ndc": ?,
    "expiration": ?,
    "lot_number": ?,
    "dea_schedule": ?,
    "drug_class": ?
  }
]
```

#### POST /rx-items

##### Description

Creates an Rx item.

##### Request Parameters

- **Path Parameters:**
  - None.
- **Query Parameters:**
  - None.
- **Body Parameters:**
  - `name`: Name of the Rx item.
  - `strength`: Strength of the Rx item (e.g. 500mg).
  - `ndc`: ?
  - `expiration`: ?
  - `lot_number`: ?
  - `dea_schedule`: ?
  - `drug_class`: ?

##### Response

- Status Codes:
  - 201 Created: Rx item successfully created.
  - 400 Bad Request: Malformed body sent to the API.
  - 401 Unauthorized: Missing the required `X-User-Id` header

##### Response Example

```json
{
  "rx_item_id": 123
}
```

#### PATCH /rx-items/:rx_item_id

##### Description

Updates an Rx item. All fields are optional and only those fields will be updated.

##### Request Parameters

- **Path Parameters:**
  - `rx_item_id`: Rx item ID.
- **Query Parameters:**
  - None.
- **Body Parameters:**
  - `name?`: Name of the Rx item.
  - `strength?`: Strength of the Rx item (e.g. 500mg).
  - `ndc?`: ?
  - `expiration?`: ?
  - `lot_number?`: ?
  - `dea_schedule?`: ?
  - `drug_class?`: ?

##### Response

- Status Codes:
  - 204 No Content: Rx item successfully updated.
  - 400 Bad Request: Malformed body sent to the API.
  - 401 Unauthorized: Missing the required `X-User-Id` header
  - 404 Not Found: Rx item not found.

#### DELETE /rx-item/:rx_item_id

##### Description

Deletes an Rx item.

##### Request Parameters

- **Path Parameters:**
  - `rx_item_id`: Rx item ID.
- **Query Parameters:**
  - None.
- **Body Parameters:**
  - None.

##### Response

- Status Codes:
  - 204 No Content: Rx item successfully deleted
  - 401 Unauthorized: Missing the required `X-User-Id` header
  - 404 Not Found: Rx item not found.

## Contact Information

Provide contact details for support and further inquiries.

## Open Questions

- Will instructors need to be able to sign in? If so, will they need a separate page to do perform custom actions?
