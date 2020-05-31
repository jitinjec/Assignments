var products = [
    { "group": "G1", "subgroup": "S1", "item": "I1", "cost": 10 },
    { "group": "G1", "subgroup": "S2", "item": "I3", "cost": 12 },
    { "group": "G2", "subgroup": "S1", "item": "I4", "cost": 20 },
    { "group": "G1", "subgroup": "S2", "item": "I2", "cost": 11 },
    { "group": "G3", "subgroup": "S1", "item": "I5", "cost": 30 },
    { "group": "G2", "subgroup": "S2", "item": "I6", "cost": 40 },
    { "group": "G2", "subgroup": "S3", "item": "I7", "cost": 50 },
];
var Tree = /** @class */ (function () {
    function Tree(subgroup, item) {
        this.subgroups = [];
        this.item_count = 0;
        this.group = subgroup;
        this.subgroups.push(item);
    }
    return Tree;
}());
var Subtree = /** @class */ (function () {
    function Subtree(subgroup, item) {
        this.items = [];
        this.item_count = 0;
        this.subgroup = subgroup;
        this.items.push(item);
    }
    return Subtree;
}());
var Item = /** @class */ (function () {
    function Item(name, cost) {
        this.name = name;
        this.cost = cost;
    }
    return Item;
}());
var tree = products.reduce(function (previousValue, currentValue) {
    var item = new Item(currentValue.item, currentValue.cost);
    var subtrees = new Subtree(currentValue.subgroup, item);
    subtrees.item_count += 1;
    var exisitngGroup = previousValue.find(function (x) { return x.group === currentValue.group; });
    if (exisitngGroup) {
        var existingSubGroup = exisitngGroup.subgroups.find(function (x) { return x.subgroup === currentValue.subgroup; });
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
        var treedata = new Tree(currentValue.group, subtrees);
        treedata.item_count = 1;
        previousValue.push(treedata);
    }
    return previousValue;
}, []);
console.log(tree);
