module.exports = function(seq, gfunc) {
  var itemCount = seq.length;
  var ii;
  var j;
  var r1;
  var r2;
  var t1;
  var t2;

  var nodes = [];

  // initialise the nodes array
  for (ii = 0; ii < itemCount; ii++) {
    nodes[ii] = {
      parent: -1,
      el: seq[ii],
      rank: 0
    };
  }

  // iterate through the original sequence
  for (ii = 0; ii < itemCount; ii++) {
    // if we have no element for the item, continue to the next 
    if (! nodes[ii].el) {
      continue;
    }

    // find the root node of the current node
    r1 = ii;
    while (nodes[r1].parent != -1) {
      r1 = nodes[r1].parent;
    }

    // iterate through the nodes again, and apply the grouping function
    for (jj = 0; jj < itemCount; jj++) {
      // if this is the same node or the grouping function fails
      // continue to the next item
      if (jj === ii || (! gfunc(nodes[ii].el, nodes[jj].el))) {
        continue;
      }

      // save the groublable item root index
      r2 = jj;
      while (nodes[r2].parent != -1) {
        r2 = nodes[r2].parent;
      }

      // continue to next if the root nodes match
      if (r1 === r2) {
        continue;
      }

      // compare rank
      if (nodes[r1].rank > nodes[r2].rank) {
        nodes[r2].parent = r1;
      }
      else {
        nodes[r1].parent = r2;
        if (nodes[r1].rank === nodes[r2].rank) {
          nodes[r2].rank += 1;
        }

        r1 = r2;
      }

      // compress paths
      compressPath(nodes, ii, r1);
      compressPath(nodes, jj, r1);
    }
  }

  return indexedNodes(nodes);
};

function compressPath(nodes, idx, root) {
  var t1 = idx;
  var t2;

  while (nodes[t1].parent != -1) {
    t2 = t1;
    t1 = nodes[t1].parent;
    nodes[t2].parent = root;
  }
}

function indexedNodes(nodes) {
  var index = [];
  var catIdx = 0;
  var ii = 0;
  var itemCount = nodes.length;
  var jj;
  var current;

  while (ii < itemCount) {
    jj = -1;
    current = ii;

    // no element? set to undefined and continue to next
    if (nodes[current].el) {
      // find the topmost node
      while (nodes[current].parent != -1) {
        current = nodes[current].parent;
      }

      if (nodes[current].rank >= 0) {
        nodes[current].rank = ~catIdx++;
      }

      jj = ~nodes[current].rank;
    }

    index[ii++] = jj;
  }

  return {
    index: index,
    cat: catIdx
  };
}