import scipy.io as scio
import networkx as nx
import json
from node2vec import Node2Vec
import numpy as np
import pandas as pd
from sklearn.manifold import TSNE
# 数据归一化函数
def maxminnorm(array):
    maxcols=array.max(axis=0)
    mincols=array.min(axis=0)
    data_shape = array.shape
    data_rows = data_shape[0]
    data_cols = data_shape[1]
    t=np.empty((data_rows,data_cols))
    for i in range(data_cols):
        t[:,i]=(array[:,i]-mincols[i])/(maxcols[i]-mincols[i])
    return t
class Main():
    def __init__(self,data):
        # A稀疏矩阵
        # local_info节点属性，节点数量*属性数量
        self.matrix = data['A'].toarray()
        self.node = data['local_info'].tolist()

        # 节点数量 6386
        # 边的数量 435324
        self.node_num = len(self.node)
        self.edge_num = 0
        for i in range(len(self.matrix)):
            for j in range(len(self.matrix[i])):
                if self.matrix[i][j] == 1.0:
                    self.edge_num += 1
        # 创建Graph
        node_list = [item for item in range(len(self.node))]
        edge_list = [(i,j) for j in range(len(self.matrix)) for i in range(len(self.matrix)) if self.matrix[i][j] == 1.0]
        self.edge_list = edge_list
        G = nx.Graph()
        G.add_nodes_from(node_list)
        G.add_edges_from(edge_list)
        self.graph = G
    def node2vec(self):
        graph = self.graph
        node2vec = Node2Vec(graph,dimensions = 64,walk_length=30,num_walks=200,workers=4)
        model = node2vec.fit(window=10,min_count=1,batch_words=4)
        model.wv.most_similar('2')
        model.wv.save_word2vec_format('./American75node2vec.txt')
    def dealFile(self):
        with open('./American75node2vec.txt') as f:
            f.readline() #规模去掉
            vector = [[] for x in range(self.node_num)]
            while True:
                line = f.readline()
                if not line:
                    break
                line = line.replace('\ n', '').split(' ')
                vector[int(line[0])] = [float(line[i]) for i in range(1,len(line))]
                print(vector[int(line[0])])
            print(vector)
        with open('../data/American75vector.json','w') as f:
            json.dump(vector,f)
    def tSNE(self):
        with open('../data/American75vector.json','r') as f:
            data = json.load(f)
            tsne = TSNE(n_components = 2).fit_transform(data)
            net = {
                'node': maxminnorm(tsne).tolist(),
                'link':self.edge_list
            }
        with open('../../src/data/American75.json','w') as f:
            json.dump(net,f)

# def Property(data):
#     nodeProperty = data['local_info'].tolist()
#     print(nodeProperty)
#     with open('../../src/data/Node_Property/Node_Property_Wellesley22.json','w') as f:
#         json.dump(nodeProperty,f)
if __name__ == '__main__':
    # 文件路径
    path = '../data/Facebook/facebook100/American75.mat'
    data = scio.loadmat(path)
    # Property(data)
    main = Main(data)
    main.node2vec()
    main.dealFile()
    main.tSNE()
