module.exports = function (seq, gfunc) {
    var i, j;
    var node = new Array(seq.length);
    for (i = 0; i < seq.length; i++)
      node[i] = {"parent" : -1,
             "element" : seq[i],
             "rank" : 0};
    for (i = 0; i < seq.length; i++) {
      if (!node[i].element)
        continue;
      var root = i;
      while (node[root].parent != -1)
        root = node[root].parent;
      for (j = 0; j < seq.length; j++) {
        if( i != j && node[j].element && gfunc(node[i].element, node[j].element)) {
          var root2 = j;

          while (node[root2].parent != -1)
            root2 = node[root2].parent;

          if(root2 != root) {
            if(node[root].rank > node[root2].rank)
              node[root2].parent = root;
            else {
              node[root].parent = root2;
              if (node[root].rank == node[root2].rank)
              node[root2].rank++;
              root = root2;
            }

            /* compress path from node2 to the root: */
            var temp, node2 = j;
            while (node[node2].parent != -1) {
              temp = node2;
              node2 = node[node2].parent;
              node[temp].parent = root;
            }

            /* compress path from node to the root: */
            node2 = i;
            while (node[node2].parent != -1) {
              temp = node2;
              node2 = node[node2].parent;
              node[temp].parent = root;
            }
          }
        }
      }
    }

    console.log(node);

    var idx = new Array(seq.length);
    var class_idx = 0;
    for(i = 0; i < seq.length; i++) {
      j = -1;
      var node1 = i;
      if(node[node1].element) {
        while (node[node1].parent != -1)
          node1 = node[node1].parent;
        if(node[node1].rank >= 0)
          node[node1].rank = ~class_idx++;
        j = ~node[node1].rank;
      }
      idx[i] = j;
    }

    return {"index" : idx, "cat" : class_idx};
  };