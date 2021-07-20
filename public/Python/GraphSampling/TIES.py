import random
import networkx as nx
import math

class TIES():
    def __init__(self,node,link):
        self.node = node
        self.link = link
        self.G = nx.Graph()
        self.G.add_nodes_from(self.node)
        self.G.add_edges_from(self.link)
        # 新建图
        self.G1 = nx.Graph()
    def ties(self,size):
        V = self.node
        G = self.G
        Vs = []
        while len(Vs) < size:
            edges_sample = random.sample(G.edges(),1)
            for a1,a2 in edges_sample:
                self.G1.add_edge(a1,a2)
                if a1 not in Vs:
                    Vs.append(a1)
                if a2 not in Vs:
                    Vs.append(a2)

        for x in self.G1.nodes():
            neigh = (set(self.G1.nodes()) & set (list(G.neighbors(x))))
            for y in neigh:
                self.G1.add_edge(x,y)
        return {
            'nodes':list(self.G1.nodes()),
            'edges':list(self.G1.edges())
        }
