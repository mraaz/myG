### ES Mappings
Before using the local Elasticsearch instance, you should add these mappings for the auto complete fields to work.
This can and should be automated at some point, but for now let's run these queries manually when we docker-compose up for the 1st time.

### Accessing ES
http://localhost:9200/
http://localhost:5601/app/kibana#/dev_tools/console?_g=()

### Elasticsearch Docker VM Memory
On MacOS you might need to run the following commands to get the ES container to stay up and running:
```
docker-machine ssh
sudo sysctl -w vm.max_map_count=262144
exit
```

### Users
PUT users
{
  "settings": {
    "analysis": {
      "filter": {
        "autocomplete_filter": {
          "type": "edge_ngram",
          "min_gram": 1,
          "max_gram": 20
        }
      },
      "analyzer": {
        "autocomplete": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "autocomplete_filter"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "alias": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "country": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "relationship": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "commendations": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "team": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "languages": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "mostPlayedGames": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "gameExperiences.name": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "underage" : {
        "type" : "boolean"
      },
      "has_mic" : {
        "type" : "boolean"
      }
    }
  }
}

### Games
PUT /games/
{
  "settings": {
    "analysis": {
      "filter": {
        "autocomplete_filter": {
          "type": "edge_ngram",
          "min_gram": 1,
          "max_gram": 20
        }
      },
      "analyzer": {
        "autocomplete": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "autocomplete_filter"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "description": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "start_date_time": {
        "type": "date" 
      },
      "end_date_time": {
        "type": "date" 
      },
      "expiry": {
        "type": "date" 
      }
    }
  }
}