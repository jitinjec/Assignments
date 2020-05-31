/**
 * I would like you to write two(or more) approaches to convert the flat structure to tree structure,
 * compare them and decide the better approach for conversion.
 *
 * Please write the unit tests to cover different data sets
 */

/**
1. Input JSON

let products = [
	{ "group": "G1", "subgroup": "S1", "item": "I1", "cost": 10 },
	{ "group": "G1", "subgroup": "S2", "item": "I2", "cost": 11 },
	{ "group": "G1", "subgroup": "S2", "item": "I3", "cost": 12 },
	{ "group": "G2", "subgroup": "S1", "item": "I4", "cost": 20 },
.
.
.
.
]

2. Suggested Output
[
	{
		"group": "G1",
		"item_count": 3,
		"subgroups": [
			{
				"subgroup": "S1",
				"item_count": 1,
				"items": [
					{ "name": "I1", "cost": 10 }
				]
			},
			{
				"subgroup": "S2",
				"item_count": 2,
				"items": [
					{ "name": "I2", "cost": 11 },
					{ "name": "I3", "cost": 12 }
				]
			}
		]
	},
	{
		"group": "G2",
		"item_count": 1,
		"subgroups": [
			{
				"subgroup": "S1",
				"item_count": 1,
				"items": [
					{ "name": "I4", "cost": 20 }
				]
			}
		]
	}
]
*/
