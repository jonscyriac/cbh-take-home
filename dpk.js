const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const createHash = (data) => crypto.createHash("sha3-512").update(data).digest("hex")

/**
 * extract the candidate from an event.
 * return TRIVIAL_PARTITION_KEY if event is not provided
 * return hash of stringified event object if event has no paritionKey 
 * @param {*} event 
 * @returns
 */
const getCandidateFromEvent = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY
  }
  if (event.partitionKey) {
    if (typeof event.partitionKey === "string") {
      return event.partitionKey
    }
    return JSON.stringify(event.partitionKey)
  }
  return createHash(JSON.stringify(event))
}

/**
 * Returns a partition key for an event object which is less than 256 bytes.
 * @param {*} event 
 * @returns 
 */
exports.deterministicPartitionKey = (event) => {
  const partitionKeyCandidate = getCandidateFromEvent(event);
  if (partitionKeyCandidate.length < MAX_PARTITION_KEY_LENGTH) {
    return partitionKeyCandidate;
  }
  return createHash(partitionKeyCandidate);
};