import express from 'express';
import db from "./connection.js";

const router = express.Router();

router.post("/query", async (req,res) => {
    let body = req.body;
    let numStage = Object.keys(body).length;
    let aggregationQuery = [];

    for(let i=0; i<numStage; i++){ //Itterate through each stage.
    
        let matchWrap = {
            $match:{}
        }

        let orQueryWrap = {
            $or: []
        }

        for(let j=0; j<4; j++){ //Itterate through each bucket in a stage.

            let andQueryWrap = {
                $and: []
            }

            body[i][j].map(rawQuery => {
                andQueryWrap.$and.push(processQuery(rawQuery));
            })

            if(andQueryWrap.$and.length != 0){
                orQueryWrap.$or.push(andQueryWrap);
            }
            
        }

        //Push query into final query object if bucket is not empty.
        if(orQueryWrap.$or.length != 0){
            matchWrap.$match = orQueryWrap;
            aggregationQuery.push(matchWrap);
        }
    
    }

    let collection = await db.collection('sample_data');
    
    if (aggregationQuery.length == 0){   //Query for all.
        let results = await collection.find({}).toArray();
        let resultJson = {
            mongoQuery:aggregationQuery,
            result:results
        }
        res.json(resultJson).status(200);
    }else{
        let results = await collection.aggregate(aggregationQuery).toArray();
        let resultJson = {
            mongoQuery:aggregationQuery,
            result:results
        }
        res.json(resultJson).status(200);
    }
})

function processQuery(item){
    /**
     * Processes a single line of raw query object from front end and returns a Mongo compatible query.
     * 
     * @param {Object} item - The input object containing query details.
        * @param {string} item.keyValue - The field name to query.
        * @param {string} item.operator - Operator (>, <, <=, >=, =)
        * @param {number} item.inputValue - Numerical value stored as a string.
     * @returns {Object} - A fragment of Mongo query object.
     **/
    let statement;

    //Prepend 0 to input value starting with decimal.
    if(item.inputValue.startsWith('.')){
        item.inputValue = 0 + item.inputValue;
    }


    if(item.keyValue == 'age'){     //Process query what is querying for age.
        switch(item.operator){
            case '>':
                statement = `
                                {"$expr": 
                                    {"$gt": [{"$subtract": ["$jd", "$jdstarthist"]}, ${item.inputValue}]}
    				            }
                            `;
                break;
            case '=':
                statement = `
                {"$expr": 
                    {"$eq": [{"$subtract": ["$jd", "$jdstarthist"]}, ${item.inputValue}]}
                }
            `;
                break;
            case '<':
                statement = `
                {"$expr": 
                    {"$lt": [{"$subtract": ["$jd", "$jdstarthist"]}, ${item.inputValue}]}
                }
            `;
                break;
            case '<=':
                statement = `
                {"$expr": 
                    {"$lte": [{"$subtract": ["$jd", "$jdstarthist"]}, ${item.inputValue}]}
                }
            `;
                break;
            case '>=':
                statement = `
                {"$expr": 
                    {"$gte": [{"$subtract": ["$jd", "$jdstarthist"]}, ${item.inputValue}]}
                }
            `;
                break;
            default:
                statement = ""
        };
    }else if(item.keyValue == 'galactic_latitude'){  //Process query what is querying for absolute value of galatic_latitude.
        switch(item.operator){
            case '>':
                statement = `
                {"$expr": 
                    {"$gt": [{"$abs": "$galactic_latitude"}, ${item.inputValue}]}
                }
            `;
                break;
            case '=':
                statement = `
                {"$expr": 
                    {"$eq": [{"$abs": "$galactic_latitude"}, ${item.inputValue}]}
                }
            `;
                break;
            case '<':
                statement = `
                {"$expr": 
                    {"$lt": [{"$abs": "$galactic_latitude"}, ${item.inputValue}]}
                }
            `;
                break;
            case '<=':
                statement = `
                {"$expr": 
                    {"$lte": [{"$abs": "$galactic_latitude"}, ${item.inputValue}]}
                }
            `;
                break;
            case '>=':
                statement = `
                {"$expr": 
                    {"$gte": [{"$abs": "$galactic_latitude"}, ${item.inputValue}]}
                }
            `;
                break;
            default:
                statement = ""
        }
    }else{
        switch(item.operator){
            case '>':
                statement = `{"${item.keyValue}":{"$gt":${item.inputValue}}}`;
                break;
            case '=':
                statement = `{"${item.keyValue}":${item.inputValue}}`;
                break;
            case '<':
                statement = `{"${item.keyValue}":{"$lt":${item.inputValue}}}`;
                break;
            case '<=':
                statement = `{"${item.keyValue}":{"$lte":${item.inputValue}}}`;
                break;
            case '>=':
                statement = statement = `{"${item.keyValue}":{"$gte":${item.inputValue}}}`;
                break;
            default:
                statement = ""
        };
    };

    return JSON.parse(statement);

};



export default router;