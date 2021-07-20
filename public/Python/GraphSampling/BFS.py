import random
import networkx as nx

class BFS():
    def __init__(self,node,link):
        self.node = node
        self.link = link

    def bfs(self,size):
        node = self.node
        link = self.link
        nr_nodes = len(node)
        sampleLink = []
        sampleNode = []
        index_of_first_random_node = random.randint(0,nr_nodes-1)
        G = nx.Graph()
        G.add_nodes_from(node)
        G.add_edges_from(link)
        sampled_graph_edges = nx.bfs_edges(G,source=node[index_of_first_random_node])
        sampled_graph_edges = list(sampled_graph_edges)
        for edge in sampled_graph_edges:
            if len(sampleNode) >= size:
                break
            else:
                sampleLink.append(edge)
                if edge[0] not in sampleNode:
                    sampleNode.append(edge[0])
                if edge[1] not in sampleNode:
                    sampleNode.append(edge[1])
        return {
            'nodes':sampleNode,
            'edges':sampleLink
        }
        # list_nodes = list(G.nodes())
        # list_edges = list(G.edges())
        # nr_nodes = len(list_nodes)
        # sample_edges = []
        # sample_nodes = []
        # index_of_first_random_node = random.randint(0, nr_nodes - 1)
        # sampled_graph_edges = nx.bfs_edges(G, source=list_nodes[index_of_first_random_node])
        # sampled_graph_edges=list(sampled_graph_edges)
        # for edge in sampled_graph_edges:
        #     if len(sample_nodes)>=size:
        #         break
        #     else:
        #         sample_edges.append(edge)
        #         if edge[0] not in sample_nodes:
        #             sample_nodes.append(edge[0])
        #         if edge[1] not in sample_nodes:
        #             sample_nodes.append(edge[1])
        # self.G1.add_edges_from(sample_edges)
        # return self.G1






