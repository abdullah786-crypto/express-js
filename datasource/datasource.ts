import { DataSource } from "typeorm"
import { User } from "../entities/user.simpleEntity"
import { BaseProductEntity } from "../entities/productEntity/baseProductEntity"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "asdfzxcv",
    database: "test_database",
    entities: [User, BaseProductEntity],
    synchronize: true
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })  
export default AppDataSource;
    
// SQL datatypes

// <--------For string datatype--------->
//   1) VARCHAR for the storing long text string 2)CHAR for storing small text string
// <--------For Numeric datatype-------->
//   1) BIGINT stores the large number of the integer values 2) INT stores the medium number of the values