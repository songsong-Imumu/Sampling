import scipy.io as scio
import networkx as nx
import json
from node2vec import Node2Vec
import numpy as np
import pandas as pd
from sklearn.manifold import TSNE
# 数据归一化函数


def maxminnorm(array):
    maxcols = array.max(axis=0)
    mincols = array.min(axis=0)
    data_shape = array.shape
    data_rows = data_shape[0]
    data_cols = data_shape[1]
    t = np.empty((data_rows, data_cols))
    for i in range(data_cols):
        t[:, i] = (array[:, i]-mincols[i])/(maxcols[i]-mincols[i])
    return t


class Main():
    def __init__(self, data, file_name):
        # A稀疏矩阵
        # local_info节点属性，节点数量*属性数量
        nodes = data['nodes']
        links = data['links']

        self.nodes_num = len(nodes)
        self.file_name = file_name
        # 创建Graph
        node_list = [item for item in range(self.nodes_num)]
        # edge_list = [(i,j) for j in range(len(self.matrix)) for i in range(len(self.matrix)) if self.matrix[i][j] == 1.0]
        edge_list = [[int(item["from"]), int(item["to"])] for item in links]
        self.edge_list = edge_list
        G = nx.Graph()
        G.add_nodes_from(node_list)
        G.add_edges_from(edge_list)
        self.graph = G

    def node2vec(self):
        graph = self.graph
        node2vec = Node2Vec(graph, dimensions=64,
                            walk_length=30, num_walks=200, workers=4)
        model = node2vec.fit(window=10, min_count=1, batch_words=4)
        model.wv.most_similar('2')
        save_path = './' + self.file_name + '.txt'
        model.wv.save_word2vec_format(save_path)

    def dealFile(self):
        open_path = './' + self.file_name + '.txt'
        with open(open_path) as f:
            f.readline()  # 规模去掉
            vector = [[] for x in range(self.nodes_num)]
            while True:
                line = f.readline()
                if not line:
                    break
                line = line.replace('\ n', '').split(' ')
                vector[int(line[0])] = [float(line[i]) for i in range(1, len(line))]
                # print(vector[int(line[0])])
            print(vector)
        save_path = './' + self.file_name + '.json'
        with open(save_path, 'w') as f:
            json.dump(vector, f)

    def tSNE(self):
        open_path = './' + self.file_name + '.json'
        with open(open_path, 'r') as f:
            data = json.load(f)
            tsne = TSNE(n_components=2).fit_transform(data)
            net = {
                'node': maxminnorm(tsne).tolist(),
                'link': self.edge_list
            }
        save_path = './' + self.file_name
        with open(save_path, 'w') as f:
            json.dump(net, f)


def Property(data):
    nodeProperty = data['nodes']
    save_path = './Node_Property_' + file_name + '.json'
    with open(save_path,'w') as f:
        json.dump(nodeProperty,f)
if __name__ == '__main__':
    # 文件路径
    file_name = 'DE.json'
    file_path = '../data/Twitter/' + file_name
    # data = scio.loadmat(path)
    with open(file_path, 'r') as f:
        data = json.load(f)
    Property(data)
    main = Main(data,file_name)
    main.node2vec()
    main.dealFile()
    main.tSNE()
