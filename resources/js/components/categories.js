class Category {
    constructor (id, fullName, icon = ''){
        this.id         = id,
        this.fullName   = fullName
        this.icon       = icon
    }

    getFullName(){return this.fullName}
}

export const bus    = new Category("bus", "BUS")
export const camera = new Category("camera", "Camera")
export const pps    = new Category("pps", "ППС")
export const dps    = new Category("dps", "ДПС")
export const otdel  = new Category("otdel", "Отдел")