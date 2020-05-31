let products = [
    { "group": "G1", "subgroup": "S1", "item": "I1", "cost": 10 },
    { "group": "G1", "subgroup": "S2", "item": "I3", "cost": 12 },
    { "group": "G2", "subgroup": "S1", "item": "I4", "cost": 20 },
    { "group": "G1", "subgroup": "S2", "item": "I2", "cost": 11 },
    { "group": "G3", "subgroup": "S1", "item": "I5", "cost": 30 },
    { "group": "G2", "subgroup": "S2", "item": "I6", "cost": 40 },
    { "group": "G2", "subgroup": "S3", "item": "I7", "cost": 50 },
];
class Tree {
    constructor(subgroup: string, item: any) {
        this.group = subgroup;
        this.subgroups.push(item)
    }
    group: string;
    subgroups: any[] = [];
    item_count = 0
}
class Subtree {
    constructor(subgroup: string, item: any) {
        this.subgroup = subgroup;
        this.items.push(item)
    }
    subgroup: string;
    items: any[] = [];
    item_count = 0

}
class Item {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
    name: string;
    cost: number
}
let tree = products.reduce((previousValue, currentValue) => {
    let item = new Item(currentValue.item, currentValue.cost);
    let subtrees = new Subtree(currentValue.subgroup, item);
    subtrees.item_count += 1;

    let exisitngGroup = previousValue.find(x => x.group === currentValue.group);
    if (exisitngGroup) {
        let existingSubGroup = exisitngGroup.subgroups.find(x => x.subgroup === currentValue.subgroup);
        if (existingSubGroup) {
            existingSubGroup.item_count += 1;
            existingSubGroup.items.push(item);
        }
        else {
            exisitngGroup.subgroups.push(subtrees);
        }
        exisitngGroup.item_count += 1;
    }
    else {
        let treedata = new Tree(currentValue.group, subtrees)
        treedata.item_count = 1;
        previousValue.push(treedata);

    }

    return previousValue;
}, []);

console.log(tree)
