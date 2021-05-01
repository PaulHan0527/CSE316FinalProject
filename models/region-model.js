const { model, Schema, ObjectId } = require('mongoose');

const regionSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        capital: {
            type: String
        },
        leader: {
            type: String
        },
        landmarks: {
            type: [String],
            required: true
        },
        parentId: {
            type: String,
            required: true
        },
        // maybe childId as [String]
        owner: {
            type: String,
            required: true
        },
        rootRegion: {
            type: Boolean,
            required: true
        }
    },
	{ timestamps: true }
);

const Region = model('Region', regionSchema);
module.exports = Region;