const pgconfig={
    HOST:"localhost",
    PORT:"5432",
    DB:"tutorial",
    USERNAME:"postgres",
    PASSWORD:"postgres",
    DIALECT:"postgres",
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}
export default pgconfig
