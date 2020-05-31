let products = [
    { "group": "G1", "subgroup": "S1", "item": "I1", "cost": 10 },
    { "group": "G1", "subgroup": "S2", "item": "I3", "cost": 12 },
    { "group": "G2", "subgroup": "S1", "item": "I4", "cost": 20 },
    { "group": "G1", "subgroup": "S2", "item": "I2", "cost": 11 },
    { "group": "G3", "subgroup": "S1", "item": "I5", "cost": 30 },
    { "group": "G2", "subgroup": "S2", "item": "I6", "cost": 40 },
    { "group": "G2", "subgroup": "S3", "item": "I7", "cost": 50 },
];
class TreeData {
    constructor(subgroup: string) {
        this.group = subgroup;
    }
    group: string;
    subgroups: any[] = [];
    item_count = 0
}
class SubtreeData {
    constructor(subgroup: string) {
        this.subgroup = subgroup;
    }
    subgroup: string;
    items: any[] = [];
    item_count = 0

}
class ItemData {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
    name: string;
    cost: number
}
products.reduce((previousValue, currentValue) => {
    let item = new Item(currentValue.item, currentValue.cost);
    let treedata = previousValue.find(x => x.group === currentValue.group) || new TreeData(currentValue.group);
    let subtrees = treedata.subgroups.find(x => x.subgroup === currentValue.subgroup) || new SubtreeData(currentValue.subgroup);

    subtrees.item_count += 1;
    subtrees.items.push(item);
    if(subtrees.item_count === 1)
        treedata.subgroups.push(subtrees);

    treedata.item_count += 1;
    if(treedata.item_count === 1)
        previousValue.push(treedata);

    return previousValue;
}, []);

