let products = [
    { "group": "G1", "subgroup": "S1", "item": "I1", "cost": 10 },
    { "group": "G1", "subgroup": "S2", "item": "I2", "cost": 11 },
    { "group": "G1", "subgroup": "S2", "item": "I3", "cost": 12 },
    { "group": "G2", "subgroup": "S1", "item": "I4", "cost": 20 },
]

let treedata = [];

products.forEach((product) => {
    
    if(treedata.findIndex(data=>data.group === product.group) > -1){
        return;
    }
    let groups = products.filter(x => x.group === product.group);
    let treeObject ={
        group: product.group,
        item_count: groups.length,
        subgroups: []
    };
    groups.forEach(group => {
        if(treeObject.subgroups.findIndex(data=>data.subgroup === group.subgroup) > -1){
            return;
        }
        let subgroups = groups.filter(x => x.subgroup === group.subgroup);
        let subgroup = {
            subgroup: group.subgroup,
            item_count: subgroups.length,
            items: []
        };
        subgroups.forEach(x => {
            let item = {
                name: x.item,
                cost: x.cost
            }
            subgroup.items.push(item);
        })
        treeObject.subgroups.push(subgroup)

    })
    treedata.push(treeObject)

})

console.log(treedata)
