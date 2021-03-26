# GENRATE CODE
### Development tool

----

## Example
```yaml
path: src/user
nameSpace: app.user
aggregate:
  name: User
  properties:
    id: id
    name: string
    lastname:
      type: string
      required: false
    birthdate: date
    emails : string[]
    address: User:Address
    phones: 
      type: User:Phone[]
      min: 1
entity:
  - name: Phone
    properties:
      id: id
      number: integer
valueObject:
  - name: Address
    properties:
      street: string
      number: integer
message:
  User:name:
    required: "El nombre es requerido"
    valid: "El nombre no es un valor válido"
  User:Phone:number:
    required: "El numero del celular es requerido"
  User:Address:street:
    required: "El nombre de avenida es requerida"
  User:phones:
    min: ""
event:
  namePrefix: user
repository:
  pk: id
  table: users
  columnName:
    birthdate: birth_date
```

## Parámetros
| Param       | Description                                                   | required | Default                           |
| ----------- | ------------------------------------------------------------- | -------- | --------------------------------- |
| path        | Ruta donde se va a generar el código                          | true     | --                                |
| nameSpace   | En caso necesario (php, java)                                 | false    | ""                                |
| aggregate   | Descripción de la entidad principal, nombre y las propiedades | true     | --                                |
| entity      | Descripción de las entidades del agregate                     | false    | []                                |
| valueObject | Descripción de los value objects del agregate                 | false    | []                                |
| messages    | mensajes para la validacion de campos                         | false    | generado por el cli               |
| event       | nombre del los eventos que se van a generar                   | false    | nombre del aggregate en minuscula |
| repository  | configuracion de la base datos                                | false    | generado por el cli               |



## Parámetro **aggregate** y voEntity
Se define el nombre y la lista de propiedades


## Parámetro **properties**

| type          | required default   | default | default values     | more config | primitive value         | length    | db       |
| ------------- | ------------------ | ------- | ------------------ | ----------- | ----------------------- | --------- | -------- |
| id            | true (no editable) | --      | --                 | --          | string                  | 36        | string   |
| string        | true               | null    | empty  o text      | min, max    | string                  | 255 o máx | string   |
| text          | true               | null    | empty  o text      | min, max    | string                  | max       | text     |
| uuid          | true               | null    | random o uuid      | --          | string                  | 36        | string   |
| date          | true               | null    | now    o date      | min, max    | Date                    | ---       | dateTime |
| integer       | true               | null    | zero   o int       | min, max    | Integer                 | ---       | integer  |
| double        | true               | null    | zero   o Double    | min, max    | Double                  | ---       | double   |
| enum          | true               | null    | firstValue o value | values      | string                  | ---       | string   |
| entity        | true               | --      | --                 | --          | depende de la entity    | ---       | ---      |
| valueObject   | true               | --      | --                 | --          | depende del valueObject | ---       | ---      |
| entity[]      | true               | --      | --                 | --          | array<entity>           | ---       | json     |
| valueObject[] | true               | --      | --                 | --          | array<valueObject>      | ---       | json     |



### id
este parametro es muy poco configurable, es obligatorio y es de tipo uuid

### string
```yaml
type: string
required: false
default: null
min: 3
max: 20
```
```yaml
type: string
required: true
default: empty
```

```yaml
type: valueObject
reference: User:Address:Name
reference: User:Address:Name[]
```

```yaml
type: entity
reference: User:Comment
reference: User:Comment[]
```

### enum
```yaml
type: enum
required: true
values: [item1,item2,item3]
```


