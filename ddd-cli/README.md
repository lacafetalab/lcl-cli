# GENRATE CODE
### Development tool

----

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

| type          | required default   | default | default values | more config | primitive value         | length    | db       |
| ------------- | ------------------ | ------- | -------------- | ----------- | ----------------------- | --------- | -------- |
| id            | true (no editable) | --      | --             | --          | string                  | 36        | string   |
| string        | false              | null    | empty          | min, max    | string                  | 255 o máx | string   |
| text          | false              | null    | empty          | min, max    | string                  | max       | text     |
| uuid          | false              | null    | random         | --          | string                  | 36        | string   |
| date          | false              | null    | now            | min, max    | Date                    | ---       | dateTime |
| integer       | false              | null    | zero           | min, max    | Integer                 | ---       | integer  |
| double        | false              | null    | zero           | min, max    | Double                  | ---       | double   |
| enum          | false              | null    | firstValue     | values      | string                  | ---       | string   |
| entity        | false              | null    | --             | --          | depende de la entity    | ---       | ---      |
| valueObject   | false              | null    | --             | --          | depende del valueObject | ---       | ---      |
| entity[]      | false              | null    | --             | --          | array                   | ---       | json     |
| valueObject[] | false              | null    | --             | --          | array                   | ---       | json     |



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


## Example
```yaml
path: src/user
nameSpace: app.user
aggregate:
  name: User
  properties:
    id: id
    name: string
    lastname: string
    description:
      type: text
      required: false
    birthdate: date
    addres: User:Address
    phones: User:Phone[]
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
  validate:
    valueObject:
      name:
        required: "El nombre es requerido"
        valid: "El nombre no es un valor válido"
      lastname:
        valid: "El apellido no es un valor válido"
event:
  namePrefix: user
repository:
  pk: id
  table: users
  columnName:
    birthdate: birth_date
```