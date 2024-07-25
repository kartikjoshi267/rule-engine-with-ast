import mongoose from "mongoose";
const { Schema } = mongoose;

const NodeSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  left: {
    type: Schema.Types.Mixed,
    default: null,
  },
  right: {
    type: Schema.Types.Mixed,
    default: null,
  },
  value: {
    type: Schema.Types.Mixed,
    default: null,
  },
});

const RuleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  ruleString: {
    type: String,
    required: true,
  },
  ast: {
    type: NodeSchema,
    required: true,
  }
});


export default mongoose.model("Rule", RuleSchema);